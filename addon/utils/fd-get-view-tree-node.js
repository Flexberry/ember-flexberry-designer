import Ember from 'ember';
import FdViewAttributesTree from '../objects/fd-view-attributes-tree';

/**
  Get attributes tree for view.
*/
let getTreeNode = function (store, id, jsTreeId, data) {

  // Get array attributes current class
  let recordsDevClass = store.peekAll('fd-dev-class');
  let classData = recordsDevClass.filterBy('id', id);

  // Get array association for current class.
  var recordsAssociation = store.peekAll('fd-dev-association');
  let associationData = recordsAssociation.filterBy('endClass.id', id);

  // Get array aggregation for current class.
  var recordsAggregation = store.peekAll('fd-dev-aggregation');
  let aggregationData = recordsAggregation.filterBy('startClass.id', id);

  // Get aggregation array for parent current class.
  var recordsInheritance = store.peekAll('fd-dev-inheritance');
  let inheritanceData = recordsInheritance.filterBy('child.id', id);

  while (inheritanceData.length > 0) {
    let parentID = null;
    for (let i = 0; i < inheritanceData.length; i++) {
      let inheritance = inheritanceData[i];
      let parentStereotype = inheritance.get('parent.stereotype');
      if (Ember.isNone(parentStereotype)) {
        parentID = inheritance.get('parent.id');
        classData.pushObjects(recordsDevClass.filterBy('id', parentID));
        associationData.pushObjects(recordsAssociation.filterBy('endClass.id', parentID));
        aggregationData.pushObjects(recordsAggregation.filterBy('startClass.id', parentID));
      } //TODO else if (parentStereotype === '«external»') {}
    }

    if (!Ember.isNone(parentID)) {
      inheritanceData = recordsInheritance.filterBy('child.id', parentID);
    } else {
      inheritanceData = Ember.A();
    }
  }

  // Set attributes tree.
  let tree = Ember.A([

    // Attribute - choose all.
    FdViewAttributesTree.create({
      text: '*',
      type: 'property',
    })
  ]);

  classData.forEach((dClass) => {
    let attributes = dClass.get('attributes');
    let idClass = dClass.get('id');
    attributes.forEach((attribute) => {
      tree.addObject(FdViewAttributesTree.create({
        text: attribute.get('name'),
        type: 'property',
        idNode: idClass
      }));
    });
  });

  associationData.forEach((master, index) => {
    let startClass = master.get('startClass');
    let masterName = startClass.get('name');
    let idMaster = startClass.get('id');
    tree.addObject(FdViewAttributesTree.create({
      text: masterName,
      type: 'master',
      id: jsTreeId + index,
      idNode: idMaster,
      children: ['#'],
      copyChildren: ['#']
    }));
  });

  if (!Ember.isNone(data)) {
    aggregationData.forEach((detail) => {
      let endClass = detail.get('endClass');
      let detailName = endClass.get('name');
      let idDetail = endClass.get('id');
      let detailViews = endClass.get('views');
      let detailViewsItems = detailViews.canonicalState.map((view) => view.getRecord().get('name'));
      let definition = data.get('data.definition');
      if (!Ember.isNone(definition)) {
        definition.forEach((attribute) => {
          if (detailName === attribute.name) {
            // Add aggregation array in model.
            attribute.detailViewNameItems = detailViewsItems;
          }
        });
      }
      
      tree.addObject(FdViewAttributesTree.create({
        text: detailName,
        type: 'detail',
        idNode: idDetail,
        detailViewNameItems: detailViewsItems
      }));
    });

    return Ember.A([
      FdViewAttributesTree.create({
        text: classData[0].get('name'),
        type: 'class',
        id: 'class',
        idNode: id,
        children: tree,
        copyChildren: tree,
        state: {
          opened: true
        }
      })
    ]);
  }

  return tree;
};

export {
  getTreeNode
};
