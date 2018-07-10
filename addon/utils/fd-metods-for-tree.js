import Ember from 'ember';

/**
  Create propertyName.
*/
let createPropertyName = function(selectedNode, treeData) {
  let parents = selectedNode.parents;
  let propertyName = '';
  if (parents.length > 2) {
    let indexParentID = parents.length - 3;
    let parentAttributes = treeData.copyChildren;
    while (indexParentID >= 0) {
      let parentID = parents[indexParentID];
      let parent = parentAttributes.findBy('id', parentID);
      propertyName = propertyName + '.' + parent.text;
      indexParentID--;
      parentAttributes = parent.copyChildren;
    }

    propertyName = propertyName.slice(1) + '.' + selectedNode.text;

  } else {
    propertyName = selectedNode.text;
  }

  return propertyName;
};

/**
  Method for restoring tree nodes.
*/
let restorationNodeTree = function(nodeArray, wantedNode, restorationTypes, restorationAllNode, callbackGetChildrenNode) {
  nodeArray.forEach(function(node) {
    if (restorationTypes.indexOf(node.type) !== -1) {
      node.set('children', node.get('copyChildren'));

      if ((!Ember.isNone(node.state) && node.state.opened) || restorationAllNode) {
        restorationNodeTree(node.get('children'), wantedNode, restorationTypes, restorationAllNode, callbackGetChildrenNode);
      }

      if (node.text === wantedNode.text && node.idNode === wantedNode.idNode && node.id === wantedNode.id) {
        node.state = { opened: true };
        if (node.get('children').length === 1 && node.get('children')[0] === '#') {
          let childrenNode = callbackGetChildrenNode(node);
          node.set('children', childrenNode);
          node.set('copyChildren', childrenNode);
        } else {
          restorationNodeTree(node.get('children'), wantedNode, restorationTypes, restorationAllNode, callbackGetChildrenNode);
        }
      }
    }
  });
};

/**
  Overridden action for jsTree 'eventDidClose'.
*/
let afterCloseNodeTree = function(e, data) {
  data.node.original.state.opened = false;
};

/**
  Find free ID for tree node.
*/
let findFreeNodeTreeID = function(name, index, searchLocation) {
  let foundValue = searchLocation.jstree(true).get_node(name + index);
  while (foundValue) {
    index++;
    foundValue = searchLocation.jstree(true).get_node(name + index);
  }

  return index;
};

/**
  Find free index for Name in tree node.
*/
let findFreeNodeTreeNameIndex = function(name, index, searchLocation, findBy) {
  let foundValue = searchLocation.findBy(`${findBy}`, name + index);
  while (!Ember.isNone(foundValue)) {
    index++;
    foundValue = searchLocation.findBy(`${findBy}`, name + index);
  }

  return index;
};

export {
  createPropertyName,
  restorationNodeTree,
  afterCloseNodeTree,
  findFreeNodeTreeID,
  findFreeNodeTreeNameIndex
};
