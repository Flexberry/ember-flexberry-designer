import { isNone } from '@ember/utils';
import FdAppStructTree from '../../objects/fd-appstruct-tree';

export function deserialize(serialized) {
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

    serialized = itemList ? _getTree(itemList) : [];
  }

  return serialized;
}

export function serialize(deserialized, allNode) {
  let xml = '<Containers><ContainersList>' + _getXMLNodes(deserialized, [], allNode) + '</ContainersList></Containers>';
  return xml;
}

function _getXMLNodes(nodes, steps, allNode) {
  let ret = '';
  if (!isNone(nodes) && nodes.length > 0) {
    nodes.forEach((nodeItem) => {
      let node = !isNone(nodeItem.original) ? nodeItem : get_node(nodeItem.id, allNode);
      let currentPath = steps.join('\\');
      if (node.original.type === 'folder') {
        steps.push(node.original.text);
        if (_onlyFolders(node, allNode)) {
          let xmlItem = '<Item' +
            ' ClassName="' + '##########' + '"' +
            ' MenuPath="' + steps.join('\\').replace(/"/g, '\\"') + '"' +
            ' Caption="" Description="" Url=""' +
            ' />';
          ret += xmlItem;
        }

        let children = node.children.map((item) => {
          return get_node(item, allNode);
        });

        let xmlItems = _getXMLNodes(children, steps, allNode);
        if (xmlItems) {
          ret += xmlItems;
        }

        steps.pop();
      } else {
        let className = node.original.className;
        if (!className) {
          className = '';
        }

        let caption = node.original.text;
        if (!caption) {
          caption = node.original.className;
        }

        let description = node.original.description;
        if (!description) {
          description = '';
        }

        let url = node.original.url;
        if (!url) {
          url = '';
        }

        let xmlItem = '<Item' +
          ' ClassName="' + className.replace(/"/g, '\\"') + '"' +
          ' MenuPath="' + currentPath.replace(/"/g, '\\"') + '"' +
          ' Caption="' +  caption.replace(/"/g, '\\"') + '"' +
          ' Description="' + description.replace(/"/g, '\\"') + '"' +
          ' Url="' + url.replace(/"/g, '\\"') + '"' +
          ' />';
        ret += xmlItem;
      }
    });
  }

  return ret;
}

function _onlyFolders(node, addNode) {
  let result = true;
  if (node.children && node.children.length) {
    for (let i = 0; i < node.children.length; i++) {
      result = !get_node(node.children[i], addNode).original.className;
      if (result === false) {
        break;
      }
    }
  } else {
    result = !node.original.className;
  }

  return result;
}

function _getTree(itemList) {
  let rootTree = [];

  let currentPath = '';
  let currentNodes = null;
  for (let i = 0; i < itemList.length; i++) {
    let item = itemList[i];
    let menuPath = item.getAttribute('MenuPath') || item.getAttribute('menupath');
    let path = menuPath ? menuPath.split('\\') : [];
    if (currentPath !== menuPath) {
      currentNodes = _findOrCreateCurrentNodes(rootTree, path.slice(), 0, i);
      currentPath = menuPath;
    }

    let className =  item.getAttribute('ClassName') || item.getAttribute('classname');
    if (className !== '##########') {
      currentNodes.nodes.push(FdAppStructTree.create({
        text: item.getAttribute('Caption') || item.getAttribute('caption'),
        type: 'property',
        className: className,
        description: item.getAttribute('Description') || item.getAttribute('description'),
        id: 'p' + path.length + 'l' + currentNodes.nodes.length + 'i' + i,
        url: item.getAttribute('Url')
      }));
    }
  }

  return rootTree;
}

function  _findOrCreateCurrentNodes(nodes, steps, index, item) {
  if (steps.length === 0) {
    return {
      nodes: nodes,
    };
  }

  let step = steps.shift();
  for (let node of nodes) {
    if (node.text === step) {
      return _findOrCreateCurrentNodes(node.children, steps, index + 1, item);
    }
  }

  let node = FdAppStructTree.create({
    text: step,
    type: 'folder',
    children: [],
    id: 'p' + index + 'l' + nodes.length + 'i' + item
  });

  nodes.push(node);
  return _findOrCreateCurrentNodes(node.children, steps, index + 1, item);
}

function get_node(id, allNode) {
  let node = allNode[id];

  return node;
}
