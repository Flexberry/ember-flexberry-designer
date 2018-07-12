import Ember from 'ember';
import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformRow from '../objects/fd-editform-row';
import FdEditformTab from '../objects/fd-editform-tab';
import FdEditformTabgroup from '../objects/fd-editform-tabgroup';
import FdAttributesTree from '../objects/fd-attributes-tree';
import FdDataTypes from '../utils/fd-datatypes';
import { getDataForBuildTree, getClassTreeNode, getAssociationTreeNode, getAggregationTreeNode } from '../utils/fd-attributes-for-tree';

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

  model: function(params) {
    let modelHash = {
      editform: undefined,
      dataobject: undefined,
      association: undefined,
      aggregation: undefined,
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
      arrayChengeClassElements: Ember.A()
    };

    let store = this.get('store');
    let stageId = this.get('currentProjectContext').getCurrentStage();

    let allClasses = store.peekAll('fd-dev-class');
    let allStages = store.peekAll('fd-dev-stage');
    let allAssociation = store.peekAll('fd-dev-association');
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
      return (item.get('stereotype') === '«implementation»' || item.get('stereotype') === null) && item.get('stage.id') === stageId;
    });
    modelHash.mastersType = this._buildTree(implementation, 'master', true);

    // Implementation not details.
    let recordsAggregation = store.peekAll('fd-dev-aggregation');
    let details = implementation.filter(function(item) {
      return recordsAggregation.findBy('endClass.id', item.id) === undefined && item.id !== dataobjectId;
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
    for (let i = 0; i < definition.length; i++) {
      let propertyDefinition = definition[i];
      this._locateControl(controlTree, propertyDefinition, propertyDefinition.path);
    }

    modelHash.controls = controlTree;

    return modelHash;
  },

  /**
    See [EmberJS API](https://emberjs.com/).

    @method resetController
  */
  resetController(controller, isExiting) {
    if (isExiting) {
      Ember.$('.full.height').off('click.fd-editform-constructor');
    }
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
  },

  /**
      Locate control by path.

      @method _locateControl
      @param {Object} controlTree Controls tree.
      @param {FdDefinition} propertyDefinition Property definition from view.
      @param {String} path Property path from view.
      @return {Object} Modified controlTree with placed control.
  */
  _locateControl: function (controlTree, propertyDefinition, path) {
    if (!path || path === '') {
      let row  = FdEditformRow.create({ controls: Ember.A(), columnsCount: 0 });

      if (controlTree.get('rows')) {
        controlTree.get('rows').pushObject(row);
      } else {
        controlTree.pushObject(row);
      }

      this._locateControlInRow(row, propertyDefinition);

      return controlTree;
    }

    if (path.charAt(0) === '|') {
      return this._locateTabs(controlTree, propertyDefinition, path);
    }

    if (path.charAt(0) === '-') {
      return this._locateGroup(controlTree, propertyDefinition, path);
    }

    if (path.charAt(0) === '#') {
      return this._locateColumn(controlTree, propertyDefinition, path);
    }

    // TODO: Show error and fix it.
  },

  /**
      Locate control in row by path.

      @method _locateControlInRow
      @param {FdEditformRow} row Row for control placement.
      @param {FdDefinition} propertyDefinition Property definition from view.
      @return {Object} Modified controlTree with placed control.
  */
  _locateControlInRow: function (row, propertyDefinition) {
    // TODO: вычислить type контрола из метаданных атрибута или FormControl и width из path.
    let control = FdEditformControl.create({
      caption: propertyDefinition.caption || propertyDefinition.name,
      name: propertyDefinition.name,
      type: 'string',
      width: '100*',
      propertyDefinition: propertyDefinition,
    });

    row.get('controls').pushObject(control);
    row.set('columnsCount', row.get('columnsCount') + 1);

    return row;
  },

  /**
      Locate tabs for control.

      @method _locateTabs
      @param {Object} controlTree Controls tree.
      @param {FdDefinition} propertyDefinition Property definition from view.
      @param {String} path Property path from view.
      @return {Object} Modified controlTree with placed tabs.
  */
  _locateTabs: function(controlTree, propertyDefinition, path) {
    let pathLength = path.length;
    let splitterIndex = path.indexOf('\\');
    let tabCaptionEndIndex = splitterIndex > -1 ? splitterIndex : pathLength;

    let tabCaption = path.slice(1, tabCaptionEndIndex);

    let row;
    let tabGroup;
    let tab;
    let rowsCollection;

    if (controlTree.get('rows')) {
      rowsCollection = controlTree.get('rows');
    } else {
      rowsCollection = controlTree;
    }

    for (let i = 0; i < rowsCollection.get('length'); i++) {
      let rowInCollection = rowsCollection[i];
      if (rowInCollection instanceof FdEditformRow) {
        for (let j = 0; j < rowInCollection.get('controls.length'); j++) {
          let controlInRow = rowInCollection.controls[j];
          if (controlInRow instanceof FdEditformTabgroup) {
            row = rowInCollection;
            tabGroup = controlInRow;
            for (let k = 0; k < controlInRow.get('tabs.length'); k++) {
              let tabInTabgroup = controlInRow.tabs[k];
              if (tabInTabgroup.caption === tabCaption) {
                tab = tabInTabgroup;
              }
            }
          }
        }
      }
    }

    if (!row) {
      row  = FdEditformRow.create({ controls: Ember.A(), columnsCount: 0 });

      if (controlTree.get('rows')) {
        controlTree.get('rows').pushObject(row);
      } else {
        controlTree.pushObject(row);
      }
    }

    if (!tabGroup) {
      tabGroup  = FdEditformTabgroup.create({ tabs: Ember.A(), width: '100*' });
      row.get('controls').pushObject(tabGroup);
    }

    if (!tab) {
      tab  = FdEditformTab.create({ rows: Ember.A(), caption: tabCaption });
      tabGroup.get('tabs').pushObject(tab);
    }

    let nextPath = path.slice(tabCaptionEndIndex + 1, pathLength);

    return this._locateControl(tab, propertyDefinition, nextPath);
  },

  /**
      Locate group for control.

      @method _locateGroup
      @param {Object} controlTree Controls tree.
      @param {FdDefinition} propertyDefinition Property definition from view.
      @param {String} path Property path from view.
      @return {Object} Modified controlTree with placed group.
  */
  _locateGroup: function(controlTree, propertyDefinition, path) {
    let pathLength = path.length;
    let splitterIndex = path.indexOf('\\');
    let groupCaptionEndIndex = splitterIndex > -1 ? splitterIndex : pathLength;

    let groupCaption = path.slice(1, groupCaptionEndIndex);

    let row;
    let group;
    let rowsCollection;

    if (controlTree.get('rows')) {
      rowsCollection = controlTree.get('rows');
    } else {
      rowsCollection = controlTree;
    }

    for (let i = 0; i < rowsCollection.get('length'); i++) {
      let rowInCollection = rowsCollection[i];
      if (rowInCollection instanceof FdEditformRow) {
        for (let j = 0; j < rowInCollection.get('controls.length'); j++) {
          let controlInRow = rowInCollection.controls[j];
          if (controlInRow instanceof FdEditformGroup && controlInRow.get('caption') === groupCaption) {
            row = rowInCollection;
            group = controlInRow;
          }
        }
      }
    }

    if (!row) {
      row  = FdEditformRow.create({ controls: Ember.A(), columnsCount: 0 });

      if (controlTree.get('rows')) {
        controlTree.get('rows').pushObject(row);
      } else {
        controlTree.pushObject(row);
      }
    }

    if (!group) {
      group  = FdEditformGroup.create({ rows: Ember.A(), width: '100*', caption: groupCaption });
      row.get('controls').pushObject(group);
    }

    let nextPath = path.slice(groupCaptionEndIndex + 1, pathLength);

    return this._locateControl(group, propertyDefinition, nextPath);
  },

  /**
      Locate column for control.

      @method _locateColumn
      @param {Object} controlTree Controls tree.
      @param {FdDefinition} propertyDefinition Property definition from view.
      @param {String} path Property path from view.
      @return {Object} Modified controlTree with placed column.
  */
  _locateColumn: function(controlTree, propertyDefinition, path) {
    let pathLength = path.length;
    let splitterIndex = path.indexOf('\\');
    let columnDefinitionEndIndex = splitterIndex > -1 ? splitterIndex : pathLength;

    let columnDefinition = path.slice(1, columnDefinitionEndIndex);

    let braceIndex = columnDefinition.indexOf('(');

    if (braceIndex === -1) {
      braceIndex = columnDefinition.length;
    }

    let columnIndex = parseInt(columnDefinition.slice(0, braceIndex));

    let rowsCollection;

    if (controlTree.get('rows')) {
      rowsCollection = controlTree.get('rows');
    } else {
      rowsCollection = controlTree;
    }

    let row = rowsCollection.get('lastObject');

    // Current columns count in row must be match column index else it will be another row.
    if (row && row.get('columnsCount') + 1 !== columnIndex) {
      row = undefined;
    }

    if (!row) {
      row  = FdEditformRow.create({ controls: Ember.A(), columnsCount: 0 });

      if (controlTree.get('rows')) {
        controlTree.get('rows').pushObject(row);
      } else {
        controlTree.pushObject(row);
      }
    }

    let nextPath = path.slice(columnDefinitionEndIndex + 1, pathLength);

    if (nextPath) {
      // TODO: may be another group or tabs there?
      return this._locateControl(row, propertyDefinition, nextPath);
    } else {
      return this._locateControlInRow(row, propertyDefinition);
    }
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

  /**
      Create type tree.

      @method _createTypeTree
      @param {Array} data Data for type tree.
      @return {Object} Object data for type tree.
  */
  _createTypeTree(nodes) {
    let typeTree = Ember.A();
    nodes.forEach((node) => {
      typeTree.pushObject(
        FdAttributesTree.create({
          text: node.get('name'),
          type: node.get('type'),
          id: node.get('id')
        }));
    });

    return typeTree;
  }
});
