import { isNone } from '@ember/utils';
import { A } from '@ember/array';
import { resolve } from 'rsvp';
import { get } from '@ember/object';

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

  let externalParentId;

  while (inheritanceData.length > 0) {
    let parentID = null;
    for (let i = 0; i < inheritanceData.length; i++) {
      let inheritance = inheritanceData[i];
      let parentStereotype = inheritance.get('parent.stereotype');
      if (isNone(parentStereotype) || parentStereotype === '«implementation»') {
        parentID = inheritance.get('parent.id');
        classData.pushObject(recordsDevClass.findBy('id', parentID));
        associationData.pushObjects(recordsAssociation.filterBy('endClass.id', parentID));
        associationData.pushObjects(recordsAggregation.filterBy('endClass.id', parentID));
        aggregationData.pushObjects(recordsAggregation.filterBy('startClass.id', parentID));
      } else if (parentStereotype === '«external»') {
        externalParentId = inheritance.get('parent.id');
      }
    }

    if (!isNone(parentID)) {
      inheritanceData = recordsInheritance.filterBy('child.id', parentID);
    } else {
      inheritanceData = A();
    }
  }

  return {
    classes: classData,
    associations: associationData,
    aggregations: aggregationData,
    externalParent: externalParentId
  };
};

/**
  Create tree node by class.
*/
let getClassTreeNode = function (tree, classData, rootId, addInText) {
  let classTree = [];

  classData.forEach((dClass) => {
    let attributes = dClass.get('attributes');
    let idClass = dClass.get('id');
    let own = true;
    if (isNone(rootId) || idClass !== rootId) {
      own = false;
    }

    attributes.forEach((attribute) => {
      if (attribute.get('isNew')) {
        return;
      }

      let text = attribute.get('name');
      let changedName = attribute.changedAttributes().name;
      if (!isNone(changedName)) {
        text = changedName[0];
      }

      if (!isNone(addInText)) {
        text += ' (' + attribute.get(`${addInText}`) + ')';
      }

      classTree.push(FdAttributesTree.create({
        text: text,
        name: attribute.get('name'),
        type: 'property',
        typeNode: attribute.get('type'),
        idNode: idClass,
        own: own,
      }));
    });
  });

  const resultTree = sortingByName(classTree);

  return tree.concat(resultTree);
};

/**
  Create tree node by association.
*/
let getAssociationTreeNode = function (tree, associationData, jsTreeId, rootId, addInText) {
  let associationTree = [];

  associationData.forEach((master, index) => {
    let startClass = master.get('startClass');
    let masterName = master.get('startRole') || startClass.get('name');
    let idMaster = startClass.get('id');
    let own = true;
    if (isNone(rootId) || master.get('endClass.id') !== rootId) {
      own = false;
    }

    let text = masterName;
    if (!isNone(addInText)) {
      text += ' (' + startClass.get(`${addInText}`) + ')';
    }

    associationTree.push(FdAttributesTree.create({
      text: text,
      name: masterName,
      type: 'master',
      typeNode: 'master',
      id: jsTreeId + index,
      idNode: idMaster,
      own: own,
      state: {
        loaded: false
      }
    }));
  });

  const resultTree = sortingByName(associationTree);

  return tree.concat(resultTree);
};

/**
  Create tree node by aggregation.
*/
let getAggregationTreeNode = function (tree, aggregationData, rootId, addInText) {
  let aggregationTree = [];

  aggregationData.forEach((detail) => {
    let endClass = detail.get('endClass');
    let detailName = detail.get('endRole') || endClass.get('name');
    let idDetail = endClass.get('id');
    let own = true;
    if (isNone(rootId) || detail.get('startClass.id') !== rootId) {
      own = false;
    }

    let text = detailName;
    if (!isNone(addInText)) {
      text += ' (' + endClass.get(`${addInText}`) + ')';
    }

    aggregationTree.push(FdAttributesTree.create({
      text: text,
      name: detailName,
      type: 'detail',
      typeNode: 'detail',
      idNode: idDetail,
      own: own,
    }));
  });

  const resultTree = sortingByName(aggregationTree);

  return tree.concat(resultTree);
};

/**
  Get detail view.
*/
let getDetailView = function (aggregationData) {

  // Array detail view.
  let detailView = A();
  aggregationData.forEach((detail) => {
    let endClass = detail.get('endClass');
    let detailViews = endClass.get('views');
    let detailViewsItems = detailViews.mapBy('name');

    detailView.pushObject({
      detailName: endClass.get('name'),
      detailRole: detail.get('endRole'),
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
  let tree = A();
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

    let namesPropertyDefinition = A(filterDefinition).map(function(item) {
      let itemName = item.get('name');
      let itemPath = itemName.split('.');
      let indexPropertyName = itemPath.length - 1;
      return itemPath[indexPropertyName];
    });

    let notUsedAttributes = attributes.filter(function(item) {
      return A(namesPropertyDefinition).indexOf(item.get('name')) === -1;
    });

    notUsedAttributes.forEach((attribute) => {
      let text = attribute.get('name');
      if (!isNone(addInText)) {
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
  let tree = A();

  let filterDefinition = definition.filter(function(item) {
    let itemSplit = item.get('name').split('.');
    let idClassPropertyName = parsingPropertyName(store, dataObject, itemSplit).classId;
    return (item instanceof FdViewAttributesMaster) && (currentClassId === idClassPropertyName);
  });

  let namesPropertyDefinition = A(filterDefinition).map(function(item) {
    let itemName = item.get('name');
    let itemPath = itemName.split('.');
    let indexPropertyName = itemPath.length - 1;
    return itemPath[indexPropertyName];
  });

  let notUsedAssociation = associationData.filter(function(item) {
    let endClass = item.get('startClass');
    return A(namesPropertyDefinition).indexOf(endClass.get('name')) === -1;
  });

  notUsedAssociation.forEach((master, index) => {
    let startClass = master.get('startClass');
    let masterName = master.get('startRole') || startClass.get('name');
    let idMaster = startClass.get('id');

    let text = masterName;
    if (!isNone(addInText)) {
      text += ' (' + startClass.get(`${addInText}`) + ')';
    }

    tree.addObject(FdAttributesTree.create({
      text: text,
      name: masterName,
      type: 'master',
      typeNode: 'master',
      id: jsTreeId + index,
      idNode: idMaster
    }));
  });

  return tree;
};

/**
  Create tree node by not used aggregation.
*/
let getTreeNodeByNotUsedAggregation = function (aggregationData, view, addInText) {
  let definition = view.get('definition');
  let tree = A();

  let filterDefinition = definition.filter(function(item) {
    return (item instanceof FdViewAttributesDetail);
  });

  let notUsedAggregation = aggregationData.filter(function(item) {
    let filterDefinitionArray = A(filterDefinition);
    let checkValue = item.get('endRole') || item.get('endClass.name');
    return isNone(filterDefinitionArray.findBy('name', checkValue));
  });

  notUsedAggregation.forEach((detail) => {
    let endClass = detail.get('endClass');
    let detailName = detail.get('endRole') || endClass.get('name');
    let idDetail = endClass.get('id');

    let text = detailName;
    if (!isNone(addInText)) {
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
  Create tree node for external class attributes.
*/
let getExternalTreeNode = function (tree, externalId, adapter) {
  let externalTree = A();

  if (isNone(externalId)) {
    return resolve(tree);
  }

  return adapter.callFunction('GetClassAttributesExternal', { classGuid: externalId }, null, { withCredentials: true }).then(({value}) => {
    const {attributes, masters} = JSON.parse(value);
    attributes.forEach((attribute) => {
      const text = get(attribute, 'name');

      externalTree.push(FdAttributesTree.create({
        text: text,
        name: text,
        type: 'property',
        typeNode: get(attribute, 'type'),
        idNode: externalId,
        own: false,
        external: true,
      }));
    });

    if (externalTree.length > 0) {
      const resultTree = sortingByName(externalTree);

      tree.push(...resultTree);
    }

    externalTree = A();

    masters.forEach((master) => {
      const masterName = get(master, 'name');
      const masterId = get(master, 'id');
  
      externalTree.push(FdAttributesTree.create({
        text: masterName,
        name: masterName,
        type: 'master',
        typeNode: 'master',
        idNode: masterId,
        own: false,
        external: true,
        state: {
          loaded: false
        }
      }));
    });

    if (externalTree.length > 0) {
      const resultTree = sortingByName(externalTree);

      tree.push(...resultTree);
    }

    return tree;
  });
};

/**
  Method for find association and class by propertyName.
*/
let parsingPropertyName = function (store, dataObject, propertyName) {
  let startRole = propertyName[0];
  let endRoleID = dataObject.get('id');
  let endRoleData = getDataForBuildTree(store, endRoleID);
  let associationSelectedClass = endRoleData.associations.filter(function(item) {
    return item.get('realStartRole') === startRole || item.get('startRole') === startRole || item.get('startClass.name') === startRole;
  });

  if (associationSelectedClass.length !== 0) {
    for (let i = 1; i < propertyName.length; i++) {
      startRole = propertyName[i];
      endRoleID = associationSelectedClass[0].get('startClass.id');
      endRoleData = getDataForBuildTree(store, endRoleID);
      let associationFilteByRealRole = endRoleData.associations.filterBy('realStartRole', startRole);
      let associationFilteByRole = endRoleData.associations.filterBy('startRole', startRole);
      associationSelectedClass = A(associationFilteByRealRole).addObjects(associationFilteByRole);
    }
  } else if (propertyName.length > 1) {
    // eslint-disable-next-line no-console
    console.error('Not found association with name:' + startRole);
    endRoleID = null;
  }

  return {
    classId: endRoleID,
    associations: associationSelectedClass
  };
};

/**
  Sorting tree ascending order by name field.
*/
let sortingByName = function (originArray) {
  let sortData = originArray.sort((a, b) => {
    let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });

  return sortData;
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
  parsingPropertyName,
  getExternalTreeNode
};
