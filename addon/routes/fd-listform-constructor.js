import Ember from 'ember';
import FdAttributesTree from '../objects/fd-attributes-tree';
import FdDataTypes from '../utils/fd-datatypes';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode } from '../utils/fd-attributes-for-tree';

export default Ember.Route.extend({
  currentContext: Ember.inject.service('fd-current-project-context'),

  queryParams: {
    form: { refreshModel: true },
    class: { refreshModel: true },
  },

  model(params) {
    let modelHash = {
      listform: undefined,
      view: undefined,
      dataobject: undefined,
      attributes: undefined,
      typemap: undefined,
      enums: undefined,
      simpleTypes: undefined,
      types: undefined,
      masters: undefined,
      mastersType: undefined,
      details: undefined,
      detailsType: undefined,
      arrayChengeClassElements: Ember.A()
    };

    let stage = this.get('currentContext').getCurrentStageModel();
    let store = this.get('store');
    let allClasses = store.peekAll('fd-dev-class');

    if (params.form) {
      modelHash.listform = allClasses.findBy('id', params.form);
      modelHash.view = modelHash.listform.get('formViews.firstObject.view');
      modelHash.dataobject = allClasses.findBy('id', modelHash.view.get('class.id'));
    } else {
      if (params.class) {
        modelHash.dataobject = allClasses.findBy('id', params.class);
      } else {
        modelHash.dataobject = store.createRecord('fd-dev-class', { stage });
      }

      modelHash.view = store.createRecord('fd-dev-view', {
        class: modelHash.dataobject,
        definition: Ember.A(),
      });

      let formView = store.createRecord('fd-dev-form-view', { view: modelHash.view });
      modelHash.listform = store.createRecord('fd-dev-class', {
        stage: stage,
        formViews: [formView],
      });
    }

    let allStages = store.peekAll('fd-dev-stage');
    let allAssociation = store.peekAll('fd-dev-association');
    let allAggregation = store.peekAll('fd-dev-aggregation');

    let dataobjectId = modelHash.dataobject.get('id');

    // Association for current class.
    modelHash.association = allAssociation.filterBy('endClass.id', dataobjectId);
    modelHash.association.pushObjects(allAggregation.filterBy('endClass.id', dataobjectId));

    // Aggregation for current class.
    modelHash.aggregation = allAggregation.filterBy('startClass.id', dataobjectId);

    // Attributes.
    let dataForBuildTree = getDataForBuildTree(store, dataobjectId);
    modelHash.attributes = getClassTreeNode(Ember.A(), dataForBuildTree.classes, dataobjectId, 'type');
    modelHash.masters = getAssociationTreeNode(Ember.A(), dataForBuildTree.associations, 'node_', dataobjectId, 'name');
    modelHash.details = getAggregationTreeNode(Ember.A(), dataForBuildTree.aggregations, dataobjectId, 'name');

    // simpleTypes.
    let fdDataTypes = FdDataTypes.create();
    modelHash.simpleTypes = this._buildTree(fdDataTypes.flexberryTypes(), 'property');

    // Implementation.
    let implementation = allClasses.filter(function(item) {
      return (item.get('stereotype') === '«implementation»' || item.get('stereotype') === null) && item.get('stage.id') === stage.get('id');
    });
    modelHash.mastersType = this._buildTree(implementation, 'master', true);

    // Implementation not details.
    let recordsAggregation = store.peekAll('fd-dev-aggregation');
    let details = implementation.filter(function(item) {
      return recordsAggregation.findBy('endClass.id', item.id) === undefined && item.id !== dataobjectId;
    });
    modelHash.detailsType = this._buildTree(details, 'detail', true);

    // Typemap.
    let currentStage = allStages.findBy('id', stage.get('id'));
    let typeMapCSStr = currentStage.get('typeMapCSStr');
    let typemap = typeMapCSStr.filter(function(item) {
      return fdDataTypes.fDTypeToFlexberry(item.name) === null;
    });
    modelHash.typemap = this._buildTree(typemap, '«typemap»');

    // Enums.
    let enums = allClasses.filter(function(item) {
      return item.get('stereotype') === '«enumeration»' && item.get('stage.id') === stage.get('id');
    });
    modelHash.enums = this._buildTree(enums, '«enumeration»');

    // Types.
    let types = allClasses.filter(function(item) {
      return item.get('stereotype') === '«type»' && item.get('stage.id') === stage.get('id');
    });
    modelHash.types = this._buildTree(types, '«type»');

    return modelHash;
  },

  /**
    A hook you can use to reset controller values either when the model changes or the route is exiting.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_resetController).

    @method resetController
    @param {Ember.Controller} controller
    @param {Boolean} isExisting
    @param {Object} transition
   */
  resetController() {
    this._super(...arguments);

    let store = this.get('store');
    store.peekAll('fd-dev-class').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-stage').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-association').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-aggregation').forEach((item) => item.rollbackAll());
  },

  /**
      Create tree.

      @method _buildTree
      @param {Array} data Data for tree.
      @param {String} type Type for tree.
      @param {Boolean} nodeId Flag need add in object node id.
      @return {Object} Object data for tree.
  */
  _buildTree: function(data, type, nodeId) {
    let treeData = Ember.A();
    data.forEach((item, index)=> {
      let text;
      if (type === '«typemap»') {
        text = item.name;
      } else if (type === 'property') {
        text = item;
      } else {
        text = item.get('name');
      }

      let newNode = FdAttributesTree.create({
        text: text,
        type: type,
        id: type + index
      });

      if (!Ember.isNone(nodeId)) {
        newNode.set('idNode', item.get('id'));
      }

      treeData.pushObject(newNode);
    });

    return treeData;
  },
});
