import Ember from 'ember';
import FdEditformControl from '../objects/fd-editform-control';
import FdEditformGroup from '../objects/fd-editform-group';
import FdEditformRow from '../objects/fd-editform-row';
import FdEditformTab from '../objects/fd-editform-tab';
import FdEditformTabgroup from '../objects/fd-editform-tabgroup';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Route.extend({

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  model: function(params) {
    let stageId = this.get('currentProjectContext').getCurrentStage();
    let _this = this;
    let modelHash = {
      editform: undefined,
      dataobject: undefined,
      typemap: undefined,
      enums: undefined,
      types: undefined
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      // TODO: Replace promises to use fd-preload-stage-metadata and store.peekRecord().
      // Load «editform».
      let loadClassesPromise = new Ember.RSVP.Promise(function (resolveLoadClasses, rejectLoadClasses) {
        let predicateEditformId = new Query.SimplePredicate('id', FilterOperator.Eq, params.id);

        let builderEditform = new  Builder(_this.store, 'fd-dev-class').
        select('id,name,caption,description,formViews,formViews.view,formViews.view.class,formViews.view.class.id,formViews.view.definition').
        where(predicateEditformId);

        _this.store.query('fd-dev-class', builderEditform.build()).then((result) => {
          let editform = result.objectAt(0);
          modelHash.editform = editform;
          return editform;
        }, rejectLoadClasses).then((editform) => {
          // Load dataobject «implementation».
          let dataobjectId = editform.get('formViews').objectAt(0).get('view.class.id'); // TODO: Check array.
          let predicateDataobjectId = new Query.SimplePredicate('id', FilterOperator.Eq, dataobjectId);

          let builderDataobject = new  Builder(_this.store, 'fd-dev-class').
          select('id,name,caption,description').
          where(predicateDataobjectId);

          _this.store.query('fd-dev-class', builderDataobject.build()).then((resultDataobject) => {
            modelHash.dataobject = resultDataobject.objectAt(0);
            resolveLoadClasses(modelHash);
          }, rejectLoadClasses);
        }, reject);
      });

      // Stage with type map.
      let predicateId = new Query.SimplePredicate('id', FilterOperator.Eq, stageId);

      let builderStage = new  Builder(_this.store, 'fd-dev-stage').
      select('id,typeMapCSStr').
      where(predicateId);

      let loadTypemapPromise = _this.store.query('fd-dev-stage', builderStage.build()).then((result) => {
        let stage = result.objectAt(0);
        modelHash.typemap = stage.get('typeMapCSStr');
        return modelHash;
      }, reject);

      let predicateStageId = new Query.SimplePredicate('stage.id', FilterOperator.Eq, stageId);

      // Enums
      let predicateEnumerationStereorype = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«enumeration»');
      let predicateEnumeration = new Query.ComplexPredicate(Query.Condition.And, predicateStageId, predicateEnumerationStereorype);

      let builderEnumeration = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,stage.id').
      where(predicateEnumeration);

      let promiseEnumeration = _this.store.query('fd-dev-class', builderEnumeration.build()).then((result) => {
        modelHash.enums = result;
        return modelHash;
      }, reject);

      // Type
      let predicateTypeStereorype = new Query.SimplePredicate('stereotype', FilterOperator.Eq, '«type»');
      let predicateType = new Query.ComplexPredicate(Query.Condition.And, predicateStageId, predicateTypeStereorype);

      let builderType = new  Builder(_this.store, 'fd-dev-class').
      select('id,name,caption,description,stereotype,stage.id').
      where(predicateType);

      let promiseType = _this.store.query('fd-dev-class', builderType.build()).then((result) => {
        modelHash.types = result;
        return modelHash;
      }, reject);

      Ember.RSVP.all([loadClassesPromise, loadTypemapPromise, promiseEnumeration, promiseType]).then(() => {
        let controlTree = Ember.A();

        let definition = modelHash.editform.get('formViews.firstObject.view.definition');
        for (let i = 0; i < definition.length; i++) {
          let propertyDefinition = definition[i];
          if (!propertyDefinition.visible) {
            continue;
          }

          _this._locateControl(controlTree, propertyDefinition, propertyDefinition.path);
        }

        modelHash.controls = controlTree;
        resolve(modelHash);
      });
    });
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
    let control = FdEditformControl.create({ caption: propertyDefinition.caption || propertyDefinition.name, type: 'string', width: '100*' });

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
  }
});
