import Ember from 'ember';
import FdAttributesTree from '../objects/fd-attributes-tree';

/**
  Get attributes tree.
*/
let getDataForBuildTree = function(store, id) {

  // Get array attributes current class
  let recordsDevClass = store.peekAll('fd-dev-class');
  let classData = recordsDevClass.filterBy('id', id);

  // Get array association for current class.
  var recordsAssociation = store.peekAll('fd-dev-association');
  let associationData = recordsAssociation.filterBy('endClass.id', id);

  // Get array aggregation for current class.
  var recordsAggregation = store.peekAll('fd-dev-aggregation');
  let aggregationData = recordsAggregation.filterBy('startClass.id', id);
  associationData.pushObjects(recordsAggregation.filterBy('endClass.id', id));

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
        associationData.pushObjects(recordsAggregation.filterBy('endClass.id', parentID));
        aggregationData.pushObjects(recordsAggregation.filterBy('startClass.id', parentID));
      } //TODO else if (parentStereotype === '«external»') {}
    }

    if (!Ember.isNone(parentID)) {
      inheritanceData = recordsInheritance.filterBy('child.id', parentID);
    } else {
      inheritanceData = Ember.A();
    }
  }

  return {
    classes: classData,
    associations: associationData,
    aggregations: aggregationData
  };
};

/**
  Create tree node by class.
*/
let getClassTreeNode = function (tree, classData, rootId, addInText) {
  classData.forEach((dClass) => {
    let attributes = dClass.get('attributes');
    let idClass = dClass.get('id');
    let own = true;
    if (Ember.isNone(rootId) || idClass !== rootId) {
      own = false;
    }

    attributes.forEach((attribute) => {
      let text = attribute.get('name');
      if (!Ember.isNone(addInText)) {
        text += ' (' + attribute.get(`${addInText}`) + ')';
      }

      tree.addObject(FdAttributesTree.create({
        text: text,
        name: attribute.get('name'),
        type: 'property',
        typeNode: attribute.get('type'),
        idNode: idClass,
        own: own,
      }));
    });
  });

  return tree;
};

/**
  Create tree node by association.
*/
let getAssociationTreeNode = function (tree, associationData, jsTreeId, rootId, addInText) {
  associationData.forEach((master, index) => {
    let startClass = master.get('startClass');
    let masterName = master.get('startRole') || startClass.get('name');
    let idMaster = startClass.get('id');
    let own = true;
    if (Ember.isNone(rootId) || master.get('endClass.id') !== rootId) {
      own = false;
    }

    let text = masterName;
    if (!Ember.isNone(addInText)) {
      text += ' (' + startClass.get(`${addInText}`) + ')';
    }

    tree.addObject(FdAttributesTree.create({
      text: text,
      name: masterName,
      type: 'master',
      typeNode: 'master',
      id: jsTreeId + index,
      idNode: idMaster,
      children: ['#'],
      copyChildren: ['#'],
      own: own,
    }));
  });

  return tree;
};

/**
  Create tree node by aggregation.
*/
let getAggregationTreeNode = function (tree, aggregationData, rootId, addInText) {
  aggregationData.forEach((detail) => {
    let endClass = detail.get('endClass');
    let detailName = detail.get('endRole') || endClass.get('name');
    let idDetail = endClass.get('id');
    let own = true;
    if (Ember.isNone(rootId) || detail.get('startClass.id') !== rootId) {
      own = false;
    }

    let text = detailName;
    if (!Ember.isNone(addInText)) {
      text += ' (' + endClass.get(`${addInText}`) + ')';
    }

    tree.addObject(FdAttributesTree.create({
      text: text,
      name: detailName,
      type: 'detail',
      typeNode: 'detail',
      idNode: idDetail,
      own: own,
    }));
  });

  return tree;
};

/**
  Get detail view.
*/
let getDetailView = function (aggregationData) {

  // Array detail view.
  let detailView = Ember.A();
  aggregationData.forEach((detail) => {
    let endClass = detail.get('endClass');
    let detailViews = endClass.get('views');
    let detailViewsItems = detailViews.mapBy('name');

    detailView.pushObject({
      detailName: endClass.get('name'),
      detailRole: detail.get('startRole'),
      detailViewNameItems: detailViewsItems
    });
  });

  return detailView;
};

export {
  getDataForBuildTree,
  getClassTreeNode,
  getAssociationTreeNode,
  getAggregationTreeNode,
  getDetailView
};
