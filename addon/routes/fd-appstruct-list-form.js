import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Route.extend({
  model: function() {
    let builder = new  Builder(this.store, 'fd-dev-class').
      select('id,name,description,stereotype,containersStr,formViews,formViews.view,formViews.view.class,formViews.view.class.name');
    let promise = this.store.query('fd-dev-class', builder.build());
    return promise;
  },

  setupController: function (controller, model) {
    let parser = new DOMParser();
    let itemList = [];
    let leftParents = [];
    let leftLeaves = [];
    let n = model.get('length');
    for (let i = 0; i < n; i++) {
      let record = model.nextObject(i);
      switch (record.get('stereotype')) {
        case null:
          leftParents.push({ id: record.get('id'), name: record.get('name'), description: record.get('description') });
          break;
        case '«listform»':
        case '«editform»':
          let parentId = record.get('formViews').nextObject(0).get('view.class.id');
          leftLeaves.push({ parentId:parentId, name: record.get('name'), description: record.get('description') });
          break;
        case '«application»':
          if (record.get('id') !== '44c730df-5cc6-45b3-9297-e4e39ad32094') {
            continue;
          }

          let xml = record.get('containersStr');
          let xmlDoc = parser.parseFromString(xml, 'text/xml');
          let items = xmlDoc.getElementsByTagName('Item');
          for (let i = 0; i < items.length; i++) {
            let item = items[i];
            itemList[itemList.length] = item;
          }

          break;
        default:
          break;
      }
    }

    let leftNodes = this._getLeftTree(leftParents, leftLeaves);
    controller.initLeftTree(leftNodes);

    let rightNodes = this._getRightTree(itemList);
    controller.initRightTree(rightNodes);

    return this._super(controller, model);
  },

  _getLeftTree: function(leftParents, leftLeaves) {
    leftParents.sort(
      function(a, b) {
        let ret = (a.id > b.id) ? 1 : ((a.id < b.id) ? -1 : 0);
        return ret;
      }
    );
    leftLeaves.sort(
      function(a, b) {
        let ret = (a.parentId > b.parentId) ? 1 : ((a.parentId < b.parentId) ? -1 :
        ((a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0)));
        return ret;
      }
    );
    let leftNodes = [];
    let leaveIndex = 0;
    for (let i = 0; i < leftParents.length; i++) {
      let leftParent = leftParents[i];
      let leftNode = { caption: leftParent.name, nodes: [] };
      for (; leaveIndex < leftLeaves.length && leftLeaves[leaveIndex].parentId === leftParent.id; leaveIndex++) {
        leftNode.nodes.push({ caption: leftLeaves[leaveIndex].name });
      }

      leftNodes.push(leftNode);
    }

    return leftNodes;
  },

  _getRightTree: function(itemList) {
    let jsonRightTreeNodes = [{ caption:'Рабочий стол', nodes:[] }];
    itemList.sort(
      function(a, b) {
        let aPath = a.getAttribute('MenuPath');
        let bPath = b.getAttribute('MenuPath');
        let ret = (aPath > bPath) ? 1 : ((bPath > aPath) ? -1 : 0);
        return ret;
      }
    );
    let currentPath = '';
    let currentNodes = null;
    for (let item of itemList) {
      let menuPath = item.getAttribute('MenuPath');
      if (currentPath !== menuPath) {
        currentNodes = this._findCurrentNodes(jsonRightTreeNodes[0].nodes, menuPath.split('\\'));
        currentPath = menuPath;
      }

      let className =  item.getAttribute('ClassName');
      if (className !== '##########') {
        currentNodes.push({ caption: className });
      }
    }

    return jsonRightTreeNodes;
  },

  _findCurrentNodes: function (nodes, steps) {
    if (steps.length === 0) {
      return nodes;
    }

    let step = steps.shift();
    for (let node of nodes) {
      if (node.caption === step) {
        return this._findCurrentNodes(node.nodes, steps);
      }
    }

    let node = { caption: step, nodes: [] };
    nodes[nodes.length] = node;
    return this._findCurrentNodes(node.nodes, steps);
  }

});
