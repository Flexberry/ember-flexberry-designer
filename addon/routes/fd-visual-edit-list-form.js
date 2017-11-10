import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Route.extend({

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  formId: null,

  editControl: {},

  controller: undefined,

  viewClassId: undefined,

  definition: {},

  //   associations: [],
  //
  //   aggregations: [],const { RSVP}

  //
  //   devClasses: {},
  //
  //   classKeys: {},

  queryParams: {
    formId: {
      refreshModel: false
    },
    classId: {
      refreshModel: false
    }
  },

  beforeModel: function(params) {
    this.formId = params.queryParams.formId;
    this.classId = params.queryParams.classId;
  },

  /*currentProjectContext: Ember.inject.service('fd-current-project-context'),*/

  _getAssocListByStage: function(stagePk) {
    let builder = new  Builder(this.store, 'fd-dev-association').
    select('startRole,assocType,startClass,startClass.id,startClass.name,endClass.id,endClass.name,stage,stage.id').
    where('stage.id', FilterOperator.Eq, stagePk);
    let promise = this.store.query('fd-dev-association', builder.build());
    return promise;
  },

  _getAggregListByStage: function(stagePk) {
    let builder = new  Builder(this.store, 'fd-dev-aggregation').
    select('startRole,startClass,startClass.id,stage,stage.id').
    where('stage.id', FilterOperator.Eq, stagePk);
    let promise = this.store.query('fd-dev-aggregation', builder.build());
    return promise;
  },

  _getClassListByStage: function(stagePk) {
    let builder = new  Builder(this.store, 'fd-dev-class').
    select('id,name,stereotype,stage,stage.id,attributes,attributes.name,attributes.type,attributes.defaultValue,attributes.class').
    where('stage.id', FilterOperator.Eq, stagePk);
    let promise = this.store.query('fd-dev-class', builder.build());
    return promise;
  },

  //   _getAssocListByEndClass(endClass) {
  //     let builder = new  Builder(this.store, 'fd-dev-association').
  //     selectByProjection('ListFormView').
  //     where('endClass.name', FilterOperator.Eq, endClass);
  //     let promise = this.store.query('fd-dev-association', builder.build());
  //     return promise;
  //   },

  model: function() {
    //    select('id,name,description,stereotype,containersStr,formViews,formViews.view,formViews.view.class,formViews.view.class.id,stage,stage.id').

    let builder = new  Builder(this.store, 'fd-dev-class').
    selectByProjection('FdAttributesForForm').
    byId(this.formId);

    /*selectByProjection('FdAttributesForForm').
     *select('id,name,description,stereotype,containersStr,attributes,attributes.name').*/
    let promise = this.store.query('fd-dev-class', builder.build());
    return promise;
  },

  setupController: function (controller, model) {
    this.controller = controller;
    this.controller.listformName = model.objectAt(0).get('name');
    let stagePk = this.get('currentProjectContext').getCurrentStage();
    let _this = this;
    let devClass = model.objectAt(0);
    let formView = devClass.get('formViews').objectAt(0);
    let view = formView.get('view');

    //     this.definition = controller._parseDefinition(view.get('definition'));
    this.definition = view.get('definition');
    this.viewClassId = view.get('class.id');
    let promises = [];
    promises.push(this._getAssocListByStage(stagePk));
    promises.push(this._getAggregListByStage(stagePk));
    promises.push(this._getClassListByStage(stagePk));
    Ember.RSVP.Promise.all(promises).then(values => {
      let associations = [];
      let devClasses = {};
      for (let i = 0; i < values.length; i++) {
        let recordList = values[i];
        switch (recordList.modelName) {
          case 'fd-dev-association':
          case 'fd-dev-aggregation':
            for (let i = 0; i < recordList.get('length'); i++) {
              let record = recordList.objectAt(i);
              let startRole = record.get(record.get('startRole') === null ? 'startClass.name' : 'startRole');
              let association = {
                id: record.id,
                startRole: startRole,
                startClass:{ id: record.get('startClass').id, name: record.get('startClass.name') }
              };

              if (recordList.modelName === 'fd-dev-association') {
                association.endClass = { id: record.get('endClass').id, name: record.get('endClass.name') };
              } else {
                association.endClass = { id: null, name: null };
              }

              associations.push(association);
            }

            break;
          case 'fd-dev-class':
            for (let i = 0; i < recordList.get('length'); i++) {
              let record = recordList.objectAt(i);
              if (record.get('stereotype')) {
                continue;
              }

              devClasses[record.id] = { name: record.get('name'), attributes: {} };
              let attributes = record.get('attributes');
              for (let j = 0; j < attributes.get('length'); j++) {
                let attribute = attributes.objectAt(j);
                let name =  attribute.get('name');
                devClasses[record.id].attributes[name] = {
                  id: attribute.id,
                  name: name,
                  type: attribute.get('type'),
                  defaultValue: attribute.get('defaultValue')
                };
              }
            }
        }
      }

      let classId = JSON.parse(JSON.stringify(_this.viewClassId));
      let definition = _this.definition;
      _this.controller.setListAttributes(classId, definition, devClasses, associations);
    });

    return this._super(controller, model);
  }

});
