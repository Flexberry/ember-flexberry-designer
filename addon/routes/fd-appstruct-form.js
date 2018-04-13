import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Route.extend({

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  model: function() {
    let stagePk = this.get('currentProjectContext').getCurrentStage();
    let _this = this;
    let modelHash = {
      implementations: undefined,
      forms: undefined,
      application: undefined
    };

    // TODO: сразу вычитывать нужные структуры без необходимости переделки их на клиенте. Пусть будет несколько параллельных запросов на сервер.
    return new Ember.RSVP.Promise(function (resolve) {
      // null or «implementation»
      let stagePkPredicate = new Query.SimplePredicate('stage.id', FilterOperator.Eq, stagePk);
      let implementationStereorypePredicate = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«implementation»');
      let emptyStereorypePredicate = new Query.SimplePredicate('stereotype', FilterOperator.Eq, null);
      let stereotypePredicate = new Query.ComplexPredicate(Query.Condition.Or, implementationStereorypePredicate, emptyStereorypePredicate);
      let implementationPredicate = new Query.ComplexPredicate(Query.Condition.And, stagePkPredicate, stereotypePredicate);

      let builderImplementation = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,stage.id').
      where(implementationPredicate);

      let promiseImplementation = _this.store.query('fd-dev-class', builderImplementation.build()).then((result) => {
        modelHash.implementations = result;
      });

      // «listform», «editform»
      let listformStereorypePredicate = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«listform»');
      let editformStereorypePredicate = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«editform»');
      let formsStereotypePredicate = new Query.ComplexPredicate(Query.Condition.Or, listformStereorypePredicate, editformStereorypePredicate);
      let formsPredicate = new Query.ComplexPredicate(Query.Condition.And, stagePkPredicate, formsStereotypePredicate);
      let builderForms = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,formViews,formViews.view,formViews.view.class.id,stage.id').
      where(formsPredicate);

      let promiseForms = _this.store.query('fd-dev-class', builderForms.build()).then((result) => {
        modelHash.forms = result;
      });
      
      // «application»
      let applicationStereorypePredicate = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«application»');
      let applicationPredicate = new Query.ComplexPredicate(Query.Condition.And, stagePkPredicate, applicationStereorypePredicate);
      
      let builderApplication = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,containersStr,stage.id').
      where(applicationPredicate);

      let promiseApplication = _this.store.query('fd-dev-class', builderApplication.build()).then((result) => {
        modelHash.application = result;
      });

      Ember.RSVP.all([/* promiseImplementation, promiseForms, */ promiseApplication]).then(() => {
        resolve(modelHash);
      });
    });
  },

  /* 
  setupController: function (controller, model) {
    let startTime = performance.now();
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
          let formView = record.get('formViews').nextObject(0);
          if (formView) {
            let parentId = formView.get('view.class.id');
            leftLeaves.push({
              id: record.get('id'),
              stereotype: record.get('stereotype'),
              parentId:parentId,
              name: record.get('name'),
              description: record.get('description')
            });
          }

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

    while (itemList && itemList.length === 1 && itemList[0].caption === 'Рабочий стол') {
      itemList = itemList[0].nodes;
    }

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

    let endTime = performance.now();

    console.log('setupController time: ' + (endTime - startTime));

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
*/
});
