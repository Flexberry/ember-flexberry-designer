import DS from 'ember-data';

export default DS.Transform.extend({

  _emptyFolderClassName: '##########',
  _xml: '',

  deserialize(serialized) {
    if (serialized) {
      let parser = new DOMParser();
      let itemList = null;
      let containersTag = 'Containers';
      let containersListTag = 'ContainersList';
      let itemTag = 'Item';
      let xmlDoc = parser.parseFromString(serialized, 'text/xml');
      if (xmlDoc) {
        let containers = xmlDoc.getElementsByTagName(containersTag);
        if (containers.length === 0) {
          containers = xmlDoc.getElementsByTagName('containers');
          if (containers.length > 0) {
            containersTag = 'containers';
            containersListTag = 'containerslist';
            itemTag = 'item';
          }
        }

        if (containers.length > 0) {
          let containersList = containers[0].getElementsByTagName(containersListTag);
          if (containersList.length > 0) {
            itemList = containersList[0].getElementsByTagName(itemTag);
          }
        }
      }

      serialized = itemList ? this._getTree(itemList) : [];
    }

    return serialized;
  },

  serialize(deserialized) {
    let xml = '<Containers><ContainersList>' + this._getXMLNodes(deserialized, []) + '</ContainersList></Containers>';
    return xml;
  },

  _getXMLNodes(nodes, steps) {
    let ret = '';
    for (let i in  nodes) {
      let node = nodes[i];
      let currentPath = steps.join('\\');
      if (node.nodes) {
        steps.push(node.caption);
        let xmlItems = this._getXMLNodes(node.nodes, steps);
        if (xmlItems.length === 0) {
          let xmlItem = '<Item' +
            ' ClassName="' + this._emptyFolderClassName + '"' +
            ' MenuPath="' + steps.join('\\').replace(/"/g, '\\"') + '"' +
            ' Caption="" Description=""' +
            ' />';
          ret += xmlItem;
        } else {
          ret += xmlItems;
        }

        steps.pop();
      } else {
        let classname = node.className;
        if (classname === 'undefined') {
          classname = node.caption;
        }

        let xmlItem = '<Item' +
        ' ClassName="' + classname.replace(/"/g, '\\"') + '"' +
        ' MenuPath="' + currentPath.replace(/"/g, '\\"') + '"' +
        ' Caption="' +  node.caption.replace(/"/g, '\\"') + '"' +
        ' Description="' + node.description.replace(/"/g, '\\"') + '"' +
        ' />';
        ret += xmlItem;
      }

    }

    return ret;
  },

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
      let menuPath = item.getAttribute('MenuPath') || item.getAttribute('menupath');
      if (currentPath !== menuPath) {
        currentNodes = this._findOrCreateCurrentNodes(rootTree, menuPath.split('\\'));
        currentPath = menuPath;
      }

      let className =  item.getAttribute('ClassName') || item.getAttribute('classname');
      if (className !== this._emptyFolderClassName) {
        currentNodes.push({
          caption: item.getAttribute('Caption') || item.getAttribute('caption'),
          className: className,
          description: item.getAttribute('Description') || item.getAttribute('description')
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
