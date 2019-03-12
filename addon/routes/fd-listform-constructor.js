import Ember from 'ember';
import Route from '@ember/routing/route';
import FdAttributesTree from '../objects/fd-attributes-tree';
import FdDataTypes from '../utils/fd-datatypes';
import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode } from '../utils/fd-attributes-for-tree';
import { copyViewDefinition } from '../utils/fd-copy-view-definition';
import { getNewFormCaption, getNewFormDescription } from '../utils/fd-create-form-properties';

export default Route.extend(FdFormCheckTransitionMixin, {
  currentContext: Ember.inject.service('fd-current-project-context'),

  actions: {
    /**
      See [EmberJS API](https://emberjs.com/).

      @method actions.didTransition
    */
    didTransition() {
      Ember.$('.full.height').on('click.fd-listform-constructor', (e) => {
        let table = Ember.$('.ui.table.fd-listform')[0];
        let path = Ember.get(e, 'originalEvent.path') || [];
        if (path.indexOf(table) === -1) {
          this.get('controller').send('selectColumn');
        }
      });
    },
  },

  queryParams: {
    form: { refreshModel: true },
    class: { refreshModel: true },
  },

  model(params) {
    let modelHash = {
      listform: undefined,
      originalDefinition: undefined,
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
        let newClassCaption = getNewFormCaption(store, 'NewClass', '');
        modelHash.dataobject = store.createRecord('fd-dev-class', {
          stage: stage,
          caption: newClassCaption,
          name: newClassCaption,
          nameStr: newClassCaption,
        });
      }

      let baseCaption = modelHash.dataobject.get('name') || modelHash.dataobject.get('nameStr');
      let newCaption = getNewFormCaption(store, baseCaption, 'L');
      let newDescription = getNewFormDescription(newCaption);

      modelHash.listform = store.createRecord('fd-dev-class', {
        stage: stage,
        caption: newCaption,
        description: newDescription,
        name: newCaption,
        nameStr: newCaption,
        stereotype: '«listform»'
      });

      modelHash.view = store.createRecord('fd-dev-view', {
        class: modelHash.dataobject,
        name: newCaption,
        definition: Ember.A()
      });

      let formView = store.createRecord('fd-dev-form-view', {
        class: modelHash.dataobject,
        view: modelHash.view,
        orderNum: 1
      });

      modelHash.listform.set('formViews', [formView]);
    }

    modelHash.originalDefinition = copyViewDefinition(modelHash.view.get('definition'));

    let allStages = store.peekAll('fd-dev-stage');
    let dataobjectId = modelHash.dataobject.get('id');

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
    let typeMapCS = currentStage.get('typeMapCS');
    let typemap = typeMapCS.filter(function(item) {
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
  resetController(controller, isExiting) {
    this._super(...arguments);

    if (isExiting) {
      Ember.$('.full.height').off('click.fd-listform-constructor');
    }

    controller.clearFormData();
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_setupController).

    @method setupController
    @param {Ember.Controller} controller
    @param {Object} model
   */
  setupController(controller) {
    this._super(...arguments);
    controller.set('_showNotUsedAttributesTree', false);
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
