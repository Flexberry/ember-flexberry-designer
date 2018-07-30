import Ember from 'ember';
import FdEditformControl from '../objects/fd-editform-control';
import FdAttributesTree from '../objects/fd-attributes-tree';
import FdDataTypes from '../utils/fd-datatypes';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode } from '../utils/fd-attributes-for-tree';
import { copyViewDefinition } from '../utils/fd-copy-view-definition';
import { locateControlByPath } from '../utils/fd-view-path-functions';

export default Ember.Route.extend({

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  actions: {
    /**
      See [EmberJS API](https://emberjs.com/).

      @method actions.didTransition
    */
    didTransition() {
      Ember.$('.full.height').on('click.fd-editform-constructor', () => {
        this.get('controller').send('selectItem');
      });
    },
  },

  queryParams: {
    classId: { refreshModel: true },
  },

  model: function(params) {
    let modelHash = {
      editform: undefined,
      originalDefinition: undefined,
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
      controls: undefined,
    };

    let store = this.get('store');
    let stageId = this.get('currentProjectContext').getCurrentStage();

    let allClasses = store.peekAll('fd-dev-class');
    let allStages = store.peekAll('fd-dev-stage');
    let allAggregation = store.peekAll('fd-dev-aggregation');

    // Editform.
    let editform = allClasses.findBy('id', params.id);
    if (!editform.get('caption')) {
      editform.set('caption', editform.get('name'));
    }

    modelHash.editform = editform;

    // Dataobject.
    let dataobjectId = editform.get('formViews').objectAt(0).get('view.class.id');
    modelHash.dataobject = allClasses.findBy('id', dataobjectId);

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
      return (item.get('stereotype') === '«implementation»' || item.get('stereotype') === null) && item.get('stage.id') === stageId;
    });
    modelHash.mastersType = this._buildTree(implementation, 'master', true);

    // Implementation not details.
    let details = implementation.filter(function(item) {
      return allAggregation.findBy('endClass.id', item.id) === undefined && item.id !== dataobjectId;
    });
    modelHash.detailsType = this._buildTree(details, 'detail', true);

    // Typemap.
    let currentStage = allStages.findBy('id', stageId);
    let typeMapCSStr = currentStage.get('typeMapCSStr');
    let typemap = typeMapCSStr.filter(function(item) {
      return fdDataTypes.fDTypeToFlexberry(item.name) === null;
    });
    modelHash.typemap = this._buildTree(typemap, '«typemap»');

    // Enums.
    let enums = allClasses.filter(function(item) {
      return item.get('stereotype') === '«enumeration»' && item.get('stage.id') === stageId;
    });
    modelHash.enums = this._buildTree(enums, '«enumeration»');

    // Types.
    let types = allClasses.filter(function(item) {
      return item.get('stereotype') === '«type»' && item.get('stage.id') === stageId;
    });
    modelHash.types = this._buildTree(types, '«type»');

    // Controls.
    let controlTree = Ember.A();
    let definition = modelHash.editform.get('formViews.firstObject.view.definition');
    modelHash.originalDefinition = copyViewDefinition(definition);
    for (let i = 0; i < definition.length; i++) {
      let propertyDefinition = definition[i];
      let path = propertyDefinition.get('path');
      let caption = propertyDefinition.get('caption') || propertyDefinition.get('name');
      let control = FdEditformControl.create({ caption, propertyDefinition });
      locateControlByPath(controlTree, control, path);
    }

    modelHash.controls = controlTree;

    return modelHash;
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
    controller.set('selectedItem', undefined);
    controller.set('_showNotUsedAttributesTree', false);
    controller.set('state', '');
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
      Ember.$('.full.height').off('click.fd-editform-constructor');
    }

    let store = this.get('store');
    store.peekAll('fd-dev-class').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-stage').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-association').forEach((item) => item.rollbackAll());
    store.peekAll('fd-dev-aggregation').forEach((item) => item.rollbackAll());
    let definition = controller.get('model.editform.formViews.firstObject.view.definition');
    definition.clear();
    definition.pushObjects(controller.get('model.originalDefinition'));
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
