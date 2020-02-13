import { A } from '@ember/array';
import { isNone } from '@ember/utils';
import { resolve } from 'rsvp';
import { getJsonForClass } from './get-json-for-diagram';

/**
  Delete primitives from diagram.
*/
function deletePrimitives(store, currentProjectContext, classArray) {
  const allDiagrams = store.peekAll('fd-dev-uml-cad');
  let diagramsCurrentStage = allDiagrams.filterBy('subsystem.stage.id', currentProjectContext.getCurrentStage());

  let promises = A();
  classArray.forEach((devClass) => {
    let name = devClass.get('name') || devClass.get('nameStr');
    let diagrams = A(diagramsCurrentStage).filter(function(diagram) {
      let caseObjectsString = diagram.get('caseObjectsString');
      return !isNone(caseObjectsString) && caseObjectsString.indexOf(`Class:(${name})`) !== -1;
    });

    diagrams.forEach((diagram) => {
      let primitives = JSON.parse(diagram.get('primitivesJsonString')) || A();

      // Update views.
      let updatedViews = getUpdatedViews(store, primitives, name, null);
      promises.pushObjects(updatedViews);

      // Find elements.
      let primitivesElementsOnDelete = A(primitives).filter(function(primitive) {
        return primitive.RepositoryObject === `{${devClass.get('id')}}`;
      });

      // Find links and views.
      let primitivesLinksOnDelete = A(primitives).filter(function(primitive) {
        // Find and delete links
        let linkOnDelete = primitivesElementsOnDelete.find((primitiveElement) => {
          let classId = primitiveElement.$id;
          return (!isNone(primitive.StartPrimitive) && primitive.StartPrimitive.$ref === classId) ||
           (!isNone(primitive.EndPrimitive) && primitive.EndPrimitive.$ref === classId);
        });

        if (!isNone(linkOnDelete)) {
          if (!isNone(primitive.RepositoryObject)) {
            let allRepObjects;
            switch (primitive.$type) {
              case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
                allRepObjects = store.peekAll('fd-dev-inheritance');
                break;
              case 'STORMCASE.UML.cad.Composition, UMLCAD':
                allRepObjects = store.peekAll('fd-dev-aggregation');
                break;
              case 'STORMCASE.UML.cad.Association, UMLCAD':
                allRepObjects = store.peekAll('fd-dev-association');
                break;
            }

            // Delete repository object links.
            let repObject = allRepObjects.findBy('id', primitive.RepositoryObject.slice(1, -1));
            repObject.deleteRecord();

            promises.pushObject(repObject);
          }

          return true;
        }

        return false;
      });

      primitives.removeObjects(primitivesElementsOnDelete);
      primitives.removeObjects(primitivesLinksOnDelete);

      if (primitives.length === 0 && diagram.get('name') === `AutogeneratedDiagramForClass_${name}`) {
        diagram.deleteRecord();
      } else {
        diagram.set('primitivesJsonString', JSON.stringify(primitives));
      }

      promises.pushObject(diagram);
    });
  });

  return promises;
}

/**
  Create primitives on diagram.
*/
function createClassPrimitive(store, currentProjectContext, devClass) {
  const system = currentProjectContext.getAutogeneratedSystemModel();
  const className = devClass.get('name') || devClass.get('nameStr');
  let diagram = store.createRecord('fd-dev-uml-cad', {
    name: `AutogeneratedDiagramForClass_${className}`,
    primitivesJsonString: '[]',
    caseObjectsString: `Class:(${className})`,
    subsystem: system
  });

  let primitivesJsonString = getJsonForClass(devClass, { X: 300, Y: 300 } );
  diagram.set('primitivesJsonString', JSON.stringify([primitivesJsonString]));

  return diagram;
}

/**
  Check if class name is changed and apply this changes.
*/
function applyNewClassName(store , context, classObject) {
  let changedNameAttribute = classObject.changedAttributes();
  let isNew = classObject.get('isNew');

  if (changedNameAttribute.name && !isNew) {
    const diagramChanges = updateDependencysOfClassName(store, context, classObject);
    return store.batchUpdate(diagramChanges);
  } else {
    return resolve();
  }
}

/**
  Update all dependencys of changed class name on diagramm .
*/
function updateDependencysOfClassName(store, currentProjectContext, devClass) {
  const allDiagrams = store.peekAll('fd-dev-uml-cad');
  let diagramsCurrentStage = allDiagrams.filterBy('subsystem.stage.id', currentProjectContext.getCurrentStage());
  let promises = A();

  const nameOrigin = devClass.changedAttributes().name[0];
  const nameNew = devClass.changedAttributes().name[1];
  
  let diagrams = A(diagramsCurrentStage).filter(function(diagram) {
    let caseObjectsString = diagram.get('caseObjectsString');
    return !isNone(caseObjectsString) && caseObjectsString.indexOf(`Class:(${nameOrigin})`) !== -1;
  });

  diagrams.forEach((diagram) => {
    let caseObjectsStringOrigin = diagram.get('caseObjectsString');
    let caseObjectsStringNew = caseObjectsStringOrigin.replace(`Class:(${nameOrigin})`, `Class:(${nameNew})`)
    diagram.set('caseObjectsString', caseObjectsStringNew);

    if (diagram.get('name') === `AutogeneratedDiagramForClass_${nameOrigin}`) {
      const newDiagramName = `AutogeneratedDiagramForClass_${nameNew}`
      diagram.set('name', newDiagramName);
    }

    let diagramPrimitives = JSON.parse(diagram.get('primitivesJsonString')) || A();

    // Update views.
    let updatedViews = getUpdatedViews(store, diagramPrimitives, nameOrigin, nameNew);
    promises.pushObjects(updatedViews);

    promises.pushObject(diagram);
  });   

  return promises;
}

/**
  Update all view, which are addicted of changed class name or class delete .
*/
function getUpdatedViews(store, primitives, className, newClassName) {
  let promises = A();
  let name = className;
  let newName = newClassName;
  primitives.forEach((primitive) => {
    //Update definitions array in primitive repository object. For views.
    const repositoryObjectRecord = (!isNone(primitive.primitive)) ? primitive.primitive.RepositoryObject : primitive.RepositoryObject;
    const repositoryObjectRecordId = repositoryObjectRecord.slice(1, -1);
    let repositoryObject = store.peekRecord('fd-dev-class', repositoryObjectRecordId);

    if (!isNone(repositoryObject)) {
      let views = repositoryObject.get('views');

      views.forEach((view) => {
        let definitionArray = view.get('definitionArray');
        let definitionArrayUpdated = false;
        definitionArray.forEach(function(definition) {
          let defName = definition.get('name');
          if (defName.indexOf(`${name}.`) !== -1) {
            if (!newName) {
              definitionArray.removeObject(definition);
            } else {
              let newDefName = definition.get('name').replace(`${name}.`, `${newName}.`);
              definition.set('name', newDefName);
            }
            
            definitionArrayUpdated = true;
          }
        });

        if (definitionArrayUpdated) {

          //For trigger computed propherty in fd-dev-view model.
          view.get('definitionArray');

          promises.pushObject(view);
        }
      });
    }
  });

  return promises;
}

export {
  createClassPrimitive,
  deletePrimitives,
  getUpdatedViews,
  applyNewClassName
};
