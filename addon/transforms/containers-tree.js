import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    if (serialized) {
      let parser = new DOMParser();
      let itemList = null;
      let xmlDoc = parser.parseFromString(serialized, 'text/xml');
      if (xmlDoc) {
        let containers = xmlDoc.getElementsByTagName('Containers');
        if (containers.length > 0) {
          let containersList = containers[0].getElementsByTagName('ContainersList');
          if (containersList.length > 0) {
            itemList = containersList[0].getElementsByTagName('Item');
          }
        }
      }

      serialized = itemList ? this._getTree(itemList) : [];
    }

    return serialized;
  },

  serialize(deserialized) {
    return deserialized;
  },

  _emptyFolderClassName: '##########',

  _getTree: function(itemList) {
    let rootTree = [];
    /*
    itemList.sort(
      function(a, b) {
        let aPath = a.getAttribute('MenuPath');
        let bPath = b.getAttribute('MenuPath');
        let ret = (aPath > bPath) ? 1 : ((bPath > aPath) ? -1 : 0);
        return ret;
      }
    );*/
    let currentPath = '';
    let currentNodes = null;
    for (let item of itemList) {
      let menuPath = item.getAttribute('MenuPath');
      if (currentPath !== menuPath) {
        currentNodes = this._findOrCreateCurrentNodes(rootTree, menuPath.split('\\'));
        currentPath = menuPath;
      }

      let className =  item.getAttribute('ClassName');
      if (className !== this._emptyFolderClassName) {
        currentNodes.push({
          itemCaption: item.getAttribute('Caption'),
          caption: className,
          description: item.getAttribute('Description')
        });
      }
    }

    return rootTree;
  },

  _findOrCreateCurrentNodes: function (nodes, steps) {
    if (steps.length === 0) {
      return nodes;
    }

    let step = steps.shift();
    for (let node of nodes) {
      if (node.caption === step) {
        return this._findOrCreateCurrentNodes(node.nodes, steps);
      }
    }

    let node = { caption: step, nodes: [] };
    nodes.push(node);
    return this._findOrCreateCurrentNodes(node.nodes, steps);
  }

});
