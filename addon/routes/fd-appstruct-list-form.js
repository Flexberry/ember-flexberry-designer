import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Route.extend({

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  model: function() {
    let stagePk = this.get('currentProjectContext').getCurrentStage();
    let builder = new  Builder(this.store, 'fd-dev-class').
    select('id,name,description,stereotype,containersStr,formViews,formViews.view,formViews.view.class,formViews.view.class.id,stage,stage.id').
    where('stage.id', FilterOperator.Eq, stagePk);
    let promise = this.store.query('fd-dev-class', builder.build());
    return promise;
  },

  setupController: function (controller, model) {
    let applicationRecordId = null;
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
          leftLeaves.push({
            id: record.get('id'),
            stereotype: record.get('stereotype'),
            parentId:parentId,
            name: record.get('name'),
            description: record.get('description')
          });
          break;
        case '«application»':
          let recordId = record.get('id');
          applicationRecordId = recordId;
          itemList = record.get('containersStr');
          break;
        default:
          break;
      }
    }

    let leftTreeNodes = this._getLeftTree(leftParents, leftLeaves);

    let rightTreeNodes = [{
      caption:'Рабочий стол',
      nodes: itemList
    }];
    model = {
      id: applicationRecordId,
      jsonLeftTreeNodes: leftTreeNodes,
      jsonRightTreeNodes: rightTreeNodes
    };
    controller.initLeftTree(leftTreeNodes);
    controller.initRightTree(rightTreeNodes);

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
      let leftNode = {
        id: leftParent.id,
        caption: leftParent.name,
        description: leftParent.description,
        nodes: []
      };
      for (; leaveIndex < leftLeaves.length && leftLeaves[leaveIndex].parentId === leftParent.id; leaveIndex++) {
        let leafLeaf = leftLeaves[leaveIndex];
        leftNode.nodes.push({
          id: leafLeaf.id,
          stereotype: leafLeaf.stereotype,
          caption: leafLeaf.name,
          description: leafLeaf.description
        });
      }

      leftNodes.push(leftNode);
    }

    return leftNodes;
  }

});
