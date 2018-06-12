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

  _locateControl: function (controlTree, propertyDefinition, path) {
    if (!path || path === '') {
      let row  = FdEditformRow.create({ controls: Ember.A(), columnsCount: 0 });

      if (controlTree.rows) {
        controlTree.rows.pushObject(row);
      } else {
        controlTree.pushObject(row);
      }

      // TODO: вычислить type контрола из метаданных атрибута или FormControl и width из path.
      let control = FdEditformControl.create({ caption: propertyDefinition.name + ' ' + propertyDefinition.path, type: 'string', width: '100*' });

      row.controls.pushObject(control);
      row.columnsCount++;
      return controlTree;
    }

    // tabs, TODO: move to the own function
    if (path.charAt(0) === '|') {
      let pathLength = path.length;
      let splitterIndex = path.indexOf('\\');
      let tabCaptionEndIndex = splitterIndex > -1 ? splitterIndex : pathLength;

      let tabCaption = path.slice(1, tabCaptionEndIndex);

      let row;
      let tabGroup;
      let tab;
      let rowsCollection;

      if (controlTree.rows) {
        rowsCollection = controlTree.rows;
      } else {
        rowsCollection = controlTree;
      }

      for (let i = 0; i < rowsCollection.length; i++) {
        let rowInCollection = rowsCollection[i];
        if (rowInCollection instanceof FdEditformRow) {
          for (let j = 0; j < rowInCollection.controls.length; j++) {
            let controlInRow = rowInCollection.controls[j];
            if (controlInRow instanceof FdEditformTabgroup) {
              row = rowInCollection;
              tabGroup = controlInRow;
              for (let k = 0; k < controlInRow.tabs.length; k++) {
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

        if (controlTree.rows) {
          controlTree.rows.pushObject(row);
        } else {
          controlTree.pushObject(row);
        }
      }

      if (!tabGroup) {
        tabGroup  = FdEditformTabgroup.create({ tabs: Ember.A(), width: '100*' });
        row.controls.pushObject(tabGroup);
      }

      if (!tab) {
        tab  = FdEditformTab.create({ rows: Ember.A(), caption: tabCaption });
        tabGroup.tabs.pushObject(tab);
      }

      let nextPath = path.slice(tabCaptionEndIndex + 1, pathLength);

      return this._locateControl(tab, propertyDefinition, nextPath);
    }

    // group, TODO: move to the own function
    if (path.charAt(0) === '-') {
      let pathLength = path.length;
      let splitterIndex = path.indexOf('\\');
      let groupCaptionEndIndex = splitterIndex > -1 ? splitterIndex : pathLength;

      let groupCaption = path.slice(1, groupCaptionEndIndex);

      let row;
      let group;
      let rowsCollection;

      if (controlTree.rows) {
        rowsCollection = controlTree.rows;
      } else {
        rowsCollection = controlTree;
      }

      for (let i = 0; i < rowsCollection.length; i++) {
        let rowInCollection = rowsCollection[i];
        if (rowInCollection instanceof FdEditformRow) {
          for (let j = 0; j < rowInCollection.controls.length; j++) {
            let controlInRow = rowInCollection.controls[j];
            if (controlInRow instanceof FdEditformGroup && controlInRow.caption === groupCaption) {
              row = rowInCollection;
              group = controlInRow;
            }
          }
        }
      }

      if (!row) {
        row  = FdEditformRow.create({ controls: Ember.A(), columnsCount: 0 });

        if (controlTree.rows) {
          controlTree.rows.pushObject(row);
        } else {
          controlTree.pushObject(row);
        }
      }

      if (!group) {
        group  = FdEditformGroup.create({ rows: Ember.A(), width: '100*', caption: groupCaption });
        row.controls.pushObject(group);
      }

      let nextPath = path.slice(groupCaptionEndIndex + 1, pathLength);

      return this._locateControl(group, propertyDefinition, nextPath);
    }

    // TODO: column
    if (path.charAt(0) === '#') {

    }

    // TODO: Show error and fix it.
  },
});
