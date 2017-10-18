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

  associations: [],

  aggregations: [],

  devClasses: {},

  queryParams: {
    formId: {
      refreshModel: false
    }
  },

  beforeModel: function(params) {
    this.formId = params.queryParams.formId;
  },

  /*currentProjectContext: Ember.inject.service('fd-current-project-context'),*/

  _getAssocListByStage(stagePk) {
    let builder = new  Builder(this.store, 'fd-dev-association').
    select('startRole,assocType,startClass,startClass.id,startClass.name,endClass.id,endClass.name,stage,stage.id').
    where('stage.id', FilterOperator.Eq, stagePk);
    //        selectByProjection('FormDesigner').
    let promise = this.store.query('fd-dev-association', builder.build());
    return promise;
  },
  _getAggregListByStage(stagePk) {
    let builder = new  Builder(this.store, 'fd-dev-aggregation').
    select('startRole,startClass,startClass.id,stage,stage.id').
    //select('startRole,assocType,startClass,startClass.id,stage,stage.id').
    //     selectByProjection('Edit').
//     byId('04cdf5a0-4aa3-4f67-85d1-225420e465d6')
   where('stage.id', FilterOperator.Eq, stagePk);
    let promise = this.store.query('fd-dev-aggregation', builder.build());
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
    let stagePk = this.get('currentProjectContext').getCurrentStage();
    let _this = this;
    let devClass = model.objectAt(0);
    let formView = devClass.get('formViews').objectAt(0);
    let view = formView.get('view');
    //     this.definition = controller._parseDefinition(view.get('definition'));
    this.definition = view.get('definition');
    this.viewClassId = view.get('class.id');
    this.devClasses[this.viewClassId] = true;
//     this._getAssocListByEndClass('МестоВОчереди').then(function (associationList) {
//       let startClassesIds = [];
//       for (let i = 0; i < associationList.get('length'); i++) {
//         let association = associationList.objectAt(i);
//       }
//     }
//     );

    let promises = [];
    promises.push(this._getAssocListByStage(stagePk));
    promises.push(this._getAggregListByStage(stagePk));
    Promise.all(promises).then(values => {
      _this.associations = [];
      _this.aggregations = [];
      for (let i = 0; i < values.length; i++) {
        let baseAssociationList = values[i];
        let startClassesIds = [];
        for (let i = 0; i < baseAssociationList.get('length'); i++) {
          let baseAssociation = baseAssociationList.objectAt(i);
          _this.devClasses[baseAssociation.get('startClass.id')] = true;
          //           startClassesIds.push(baseAssociation.get('startClass').id);
          let startRole = baseAssociation.get('startRole') === null ?
            baseAssociation.get('startClass.name'):
            baseAssociation.get('startRole');
            if (baseAssociationList.modelName === 'fd-dev-association') {
              _this.associations.push({
                id: baseAssociation.id,
                startRole: startRole,
                startClass:{
                  id: baseAssociation.get('startClass').id,
                  name: baseAssociation.get('startClass.name'),
                },
                endClass:{
                  id: baseAssociation.get('endClass').id,
                  name: baseAssociation.get('endClass.name'),
                },
              });
              _this.devClasses[baseAssociation.get('endClass.id')] = true;
            } else {
              _this.aggregations.push({
                id: baseAssociation.id,
                startRole: startRole,
                startClass:{
                  id: baseAssociation.get('startClass').id,
                  name: baseAssociation.get('startClass.name'),
                }
              });
            }
        }
      }
      let promises = [];
      for (let classId in  _this.devClasses) {
          let builder = new  Builder(_this.store, 'fd-dev-class').
          select('id,name,stereotype,attributes,attributes.name,attributes.type,attributes.defaultValue,attributes.class').
          byId(classId);
          promises.push(_this.store.query('fd-dev-class', builder.build()));
          //           selectByProjection('AttributesView').
        }
//         alert('startClassesIds=' + _this.devClasses);
      Promise.all(promises).then( values => {
          for (let i = 0; i < values.length; i++) {
            let value = values[i];
            let devClass = values[i].objectAt(0);
            _this.devClasses[devClass.id] = {
              name: devClass.get('name'),
              stereotype: devClass.get('stereotype'),
              attributes: {}
            };
            let attributes = devClass.get('attributes');
            for (let j = 0; j < attributes.get('length') ; j++) {
              let attribute = attributes.objectAt(j);
              let name =  attribute.get('name');
              _this.devClasses[devClass.id].attributes[name] = {
                id: attribute.id,
                name: name,
                type: attribute.get('type'),
                defaultValue: attribute.get('defaultValue')
              };
            }
          }
//            alert('Devs=' + JSON.stringify(_this.devClasses));
//            alert('viewClassId='+_this.viewClassId + '\ndefinition=' + JSON.stringify(_this.definition));
          _this.controller.setClassTree(_this.associations, _this.aggregations, _this.devClasses);
          _this.controller.setListAttributes(_this.viewClassId, _this.definition);
//           alert('Assoc=' + JSON.stringify(_this.associations));
        });
      },
      function(data) {
        alert('Error' + data);
      }
    );

    return this._super(controller, model);
  }

});
