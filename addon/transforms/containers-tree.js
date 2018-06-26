import Ember from 'ember';
import DS from 'ember-data';
import FdViewAttributesTree from '../objects/fd-view-attributes-tree';

export default DS.Transform.extend({

  _emptyFolderClassName: '##########',

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

      serialized = itemList ? this._getTree(itemList) : Ember.A();
    }

    return serialized;
  },

  serialize(deserialized) {
    let xml = '<Containers><ContainersList>' + this._getXMLNodes(deserialized, []) + '</ContainersList></Containers>';
    return xml;
  },

  _getXMLNodes(nodes, steps) {
    let ret = '';
    if (!Ember.isNone(nodes) && nodes.length > 0) {
      nodes.forEach((node) => {
        let currentPath = steps.join('\\');
        if (node.copyChildren) {
          steps.push(node.text);
          if (this._onlyFolders(node)) {
            let xmlItem = '<Item' +
              ' ClassName="' + this._emptyFolderClassName + '"' +
              ' MenuPath="' + steps.join('\\').replace(/"/g, '\\"') + '"' +
              ' Caption="" Description=""' +
              ' />';
            ret += xmlItem;
          }

          let xmlItems = this._getXMLNodes(node.copyChildren, steps);
          if (xmlItems) {
            ret += xmlItems;
          }

          steps.pop();
        } else {
          let caption = node.caption;
          if (!caption) {
            caption = node.className;
          }

          let description = node.description;
          if (!description) {
            description = '';
          }

          let xmlItem = '<Item' +
            ' ClassName="' + node.className.replace(/"/g, '\\"') + '"' +
            ' MenuPath="' + currentPath.replace(/"/g, '\\"') + '"' +
            ' Caption="' +  caption.replace(/"/g, '\\"') + '"' +
            ' Description="' + description.replace(/"/g, '\\"') + '"' +
            ' />';
          ret += xmlItem;
        }
      });
    }

    return ret;
  },

  _onlyFolders(node) {
    let result = true;
    if (node.copyChildren && node.copyChildren.length) {
      for (let i = 0; i < node.copyChildren.length; i++) {
        result = !node.copyChildren[i].className;
        if (result === false) {
          break;
        }
      }
    } else {
      result = !node.className;
    }

    return result;
  },

  _getTree: function(itemList) {
    let rootTree = Ember.A();
    let copyRootTree = Ember.A();

    let currentPath = '';
    let currentNodes = null;
    for (let i = 0; i < itemList.length; i++) {
      let item = itemList[i];
      let menuPath = item.getAttribute('MenuPath') || item.getAttribute('menupath');
      if (currentPath !== menuPath) {
        currentNodes = this._findOrCreateCurrentNodes(rootTree, copyRootTree, menuPath.split('\\'), 0, i);
        currentPath = menuPath;
      }

      let className =  item.getAttribute('ClassName') || item.getAttribute('classname');
      if (className !== this._emptyFolderClassName) {
        currentNodes.nodes.pushObject(FdViewAttributesTree.create({
          text: item.getAttribute('Caption') || item.getAttribute('caption'),
          caption: item.getAttribute('Caption') || item.getAttribute('caption'),
          type: 'property',
          className: className,
          description: item.getAttribute('Description') || item.getAttribute('description'),
          id: 'p' + menuPath.split('\\').length + 'l' + currentNodes.nodes.length + 'i' + i
        }));
        currentNodes.copyNodes.pushObject(FdViewAttributesTree.create({
          text: item.getAttribute('Caption') || item.getAttribute('caption'),
          caption: item.getAttribute('Caption') || item.getAttribute('caption'),
          type: 'property',
          className: className,
          description: item.getAttribute('Description') || item.getAttribute('description'),
          id: 'p' + menuPath.split('\\').length + 'l' + currentNodes.copyNodes.length + 'i' + i
        }));
      }
    }

    return rootTree;
  },

  _findOrCreateCurrentNodes: function (nodes, copyNodes, steps, index, item) {
    if (steps.length === 0) {
      return {
        nodes: nodes,
        copyNodes: copyNodes
      };
    }

    let step = steps.shift();
    for (let node of nodes) {
      if (node.text === step) {
        return this._findOrCreateCurrentNodes(node.children, node.copyChildren, steps, index + 1, item);
      }
    }

    let node = FdViewAttributesTree.create({
      text: step,
      type: 'master',
      children: Ember.A(),
      copyChildren: Ember.A(),
      id: 'p' + index + 'l' + nodes.length + 'i' + item
    });

    nodes.pushObject(node);
    copyNodes.pushObject(node);
    return this._findOrCreateCurrentNodes(node.children, node.copyChildren, steps, index + 1, item);
  }

});
