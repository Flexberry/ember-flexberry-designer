import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;


export default Ember.Route.extend({
  model: function() {
    let builder = new  Builder(this.store, 'fd-dev-class').select('id,name,description,stereotype,containersStr,formViews,formViews.view,formViews.view.class');
    let promise = this.store.query('fd-dev-class',builder.build());
    return promise;
  },


  setupController: function (controller, model) {
    let parser = new DOMParser();
    let itemList = [];
    let n = model.get('length');
    for (let i=0; i < n; i++) {
      let record = model.nextObject(i);
      switch (record.get('stereotype')) {
        case null:
          break;
        case '«listform»':
        case '«editform»':
          break;
        case '«application»':
          let xml = record.get('containersStr');
          let xmlDoc = parser.parseFromString(xml,"text/xml");
          let items = xmlDoc.getElementsByTagName("Item");
          for (let i=0; i < items.length; i++) {
            let item = items[i];
            itemList[itemList.length] = item;
          }
          break;
        default:
          break;
      }
    }
    controller.initLeftTree({});
    let rightNodes = this._getRightTree(itemList);
    controller.initRightTree(rightNodes);

    return this._super(controller, model);
  },

  _getRightTree: function(itemList) {
    let jsonRightTreeNodes = [{"caption":"Рабочий стол", nodes:[] }];
    itemList.sort(
      function(a, b){
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
      if (currentPath != menuPath) {
        currentNodes = this._findCurrentNodes(jsonRightTreeNodes[0].nodes, menuPath.split('\\'));
        currentPath = menuPath;
      }
      let className =  item.getAttribute('ClassName');
      if (className != '##########') {
        currentNodes[currentNodes.length] = {'caption': className}
      }
    }
    return jsonRightTreeNodes;
  },

  _findCurrentNodes: function (nodes, steps) {
    if (steps.length == 0) {
      return nodes;
    }
    let step = steps.shift();
    for (let node of nodes) {
      if (node.caption == step) {
        return this._findCurrentNodes(node.nodes, steps);
      }
    }
    let node = {'caption': step, nodes: []};
    nodes[nodes.length] = node;
    return this._findCurrentNodes(node.nodes, steps);
  }

});
