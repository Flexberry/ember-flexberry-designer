import { A } from '@ember/array';
import { isNone } from '@ember/utils';
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

      // Find elements.
      let primitivesElementsOnDelete = A(primitives).filter(function(primitive) {
        return primitive.RepositoryObject === `{${devClass.get('id')}}`;
      });

      // Find links.
      let primitivesLinksOnDelete = A(primitives).filter(function(primitive) {
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

export {
  createClassPrimitive,
  deletePrimitives,
};
