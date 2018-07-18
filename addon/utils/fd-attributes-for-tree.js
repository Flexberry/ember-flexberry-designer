import Ember from 'ember';
import FdAttributesTree from '../objects/fd-attributes-tree';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';

/**
  Get attributes tree.
*/
let getDataForBuildTree = function(store, id) {

  // Get array attributes current class
  let recordsDevClass = store.peekAll('fd-dev-class');
  let classData = recordsDevClass.filterBy('id', id);

  // Get array association for current class.
  let recordsAssociation = store.peekAll('fd-dev-association');
  let associationData = recordsAssociation.filterBy('endClass.id', id);

  // Get array aggregation for current class.
  let recordsAggregation = store.peekAll('fd-dev-aggregation');
  let aggregationData = recordsAggregation.filterBy('startClass.id', id);
  associationData.pushObjects(recordsAggregation.filterBy('endClass.id', id));

  // Get aggregation array for parent current class.
  let recordsInheritance = store.peekAll('fd-dev-inheritance');
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

/**
  Create tree node by not used attributes.
*/
let getTreeNodeByNotUsedAttributes = function (store, classData, view, addInText) {
  let definition = view.get('definition');
  let dataObject = view.get('class');
  let tree = Ember.A();
  classData.forEach((dClass) => {
    let attributes = dClass.get('attributes');
    let idClass = dClass.get('id');

    let filterDefinition = definition.filter(function(item) {
      let itemSplit = item.get('name').split('.');
      let idClassPropertyName = parsingPropertyName(store, dataObject, itemSplit).classId;
      return !(item instanceof FdViewAttributesMaster) &&
        !(item instanceof FdViewAttributesDetail) &&
        (idClass === idClassPropertyName);
    });

    let namesPropertyDefinition = Ember.A(filterDefinition).map(function(item) {
      let itemName = item.get('name');
      let itemPath = itemName.split('.');
      let indexPropertyName = itemPath.length - 1;
      return itemPath[indexPropertyName];
    });

    let notUsedAttributes = attributes.filter(function(item) {
      return Ember.A(namesPropertyDefinition).indexOf(item.get('name')) === -1;
    });

    notUsedAttributes.forEach((attribute) => {
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
      }));
    });
  });

  return tree;
};

/**
  Create tree node by not used association.
*/
let getTreeNodeByNotUsedAssociation = function (store, associationData, jsTreeId, view, addInText) {
  let definition = view.get('definition');
  let dataObject = view.get('class');
  let currentClassId = associationData.length > 0 ? associationData.get('firstObject.endClass.id') : null;
  let tree = Ember.A();

  let filterDefinition = definition.filter(function(item) {
    let itemSplit = item.get('name').split('.');
    let idClassPropertyName = parsingPropertyName(store, dataObject, itemSplit).classId;
    return (item instanceof FdViewAttributesMaster) && (currentClassId === idClassPropertyName);
  });

  let namesPropertyDefinition = Ember.A(filterDefinition).map(function(item) {
    let itemName = item.get('name');
    let itemPath = itemName.split('.');
    let indexPropertyName = itemPath.length - 1;
    return itemPath[indexPropertyName];
  });

  let notUsedAssociation = associationData.filter(function(item) {
    let endClass = item.get('startClass');
    return Ember.A(namesPropertyDefinition).indexOf(endClass.get('name')) === -1;
  });

  notUsedAssociation.forEach((master, index) => {
    let startClass = master.get('startClass');
    let masterName = master.get('startRole') || startClass.get('name');
    let idMaster = startClass.get('id');

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
    }));
  });

  return tree;
};

/**
  Create tree node by not used aggregation.
*/
let getTreeNodeByNotUsedAggregation = function (aggregationData, view, addInText) {
  let definition = view.get('definition');
  let tree = Ember.A();

  let filterDefinition = definition.filter(function(item) {
    return (item instanceof FdViewAttributesDetail);
  });

  let notUsedAggregation = aggregationData.filter(function(item) {
    let filterDefinitionArray = Ember.A(filterDefinition);
    let checkValue = item.get('endRole') || item.get('endClass.name');
    return Ember.isNone(filterDefinitionArray.findBy('name', checkValue));
  });

  notUsedAggregation.forEach((detail) => {
    let endClass = detail.get('endClass');
    let detailName = detail.get('endRole') || endClass.get('name');
    let idDetail = endClass.get('id');

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
    }));
  });

  return tree;
};

/**
  Method for find association and class by propertyName.
*/
let parsingPropertyName = function (store, dataObject, propertyName) {
  let stageId = dataObject.get('stage.id');
  let allAssociation = store.peekAll('fd-dev-association').filterBy('stage.id', stageId);
  let allAggregation = store.peekAll('fd-dev-aggregation').filterBy('stage.id', stageId);
  allAssociation.pushObjects(allAggregation);

  let startRole = propertyName[0];
  let endRoleID = dataObject.get('id');
  let associationSelectedClass = allAssociation.filter(function(item) {
    return item.get('endClass.id') === endRoleID && (item.get('realStartRole') === startRole || item.get('startRole') === startRole);
  });

  for (let i = 1; i < propertyName.length; i++) {
    startRole = propertyName[i];
    endRoleID = associationSelectedClass[0].get('startClass.id');
    let associationFilteBuId = Ember.A(allAssociation.filterBy('endClass.id', endRoleID));
    let associationFilteByRealRole = associationFilteBuId.filterBy('realStartRole', startRole);
    let associationFilteByRole = associationFilteBuId.filterBy('startRole', startRole);
    associationSelectedClass = Ember.A(associationFilteByRealRole).addObjects(associationFilteByRole);
  }

  return {
    classId: endRoleID,
    associations: associationSelectedClass
  };
};

export {
  getDataForBuildTree,
  getClassTreeNode,
  getAssociationTreeNode,
  getAggregationTreeNode,
  getDetailView,
  getTreeNodeByNotUsedAttributes,
  getTreeNodeByNotUsedAssociation,
  getTreeNodeByNotUsedAggregation,
  parsingPropertyName
};
