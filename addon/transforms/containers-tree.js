import DS from 'ember-data';

export default DS.Transform.extend({

  _emptyFolderClassName: '##########',

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
    let containers = document.createElement('Containers');
    let containersList = document.createElement('ContainersList');
    containersList.appendChild(this._getXMLNodes(deserialized, []));
    containers.appendChild(containersList);
    deserialized = containers.outerHTML;
    return deserialized;
  },


  _getXMLNodes(nodes, steps) {
    let itemList = document.createDocumentFragment();
    for (let i in  nodes) {
      let node = nodes[i];
      let currentPath = steps.join('\\');
      if (node.nodes) {
        steps.push(node.caption);
        let containers = this._getXMLNodes(node.nodes, steps);
        if (containers.childNodes.length === 0) {
          let folder = document.createElement('Item');
          folder.setAttribute('ClassName', this._emptyFolderClassName);
          folder.setAttribute('MenuPath', steps.join('\\') );
          folder.setAttribute('Caption', '');
          folder.setAttribute('Description', '');
          itemList.appendChild(folder);
        } else {
          itemList.appendChild(containers);
        }
        steps.pop();
      } else {
        let leaf = document.createElement('Item');
        leaf.setAttribute('ClassName', node.className);
        leaf.setAttribute('MenuPath', currentPath);
        leaf.setAttribute('Caption', node.caption);
        leaf.setAttribute('Description', node.description);
        itemList.appendChild(leaf);
      }

    }
    return itemList;
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
      let menuPath = item.getAttribute('MenuPath');
      if (currentPath !== menuPath) {
        currentNodes = this._findOrCreateCurrentNodes(rootTree, menuPath.split('\\'));
        currentPath = menuPath;
      }

      let className =  item.getAttribute('ClassName');
      if (className !== this._emptyFolderClassName) {
        currentNodes.push({
          caption: item.getAttribute('Caption'),
          className: className,
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
