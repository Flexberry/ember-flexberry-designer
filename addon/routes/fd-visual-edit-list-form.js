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
    selectByProjection('FormDesigner').
    where('stage.id', FilterOperator.Eq, stagePk);
    let promise = this.store.query('fd-dev-association', builder.build());
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
    this.definition = controller._parseDefinition(view.get('definition'));
    this.viewClassId = view.get('class.id');
    this.devClasses[this.viewClassId] = true;
//     this._getAssocListByEndClass('МестоВОчереди').then(function (associationList) {
//       let startClassesIds = [];
//       for (let i = 0; i < associationList.get('length'); i++) {
//         let association = associationList.objectAt(i);
//       }
//     }
//     );


    this._getAssocListByStage(stagePk).then(
      function (associationList) {
        let startClassesIds = [];
        for (let i = 0; i < associationList.get('length'); i++) {
          let association = associationList.objectAt(i);
          _this.devClasses[association.get('startClass.id')] = true;
          _this.devClasses[association.get('endClass.id')] = true;
          //           startClassesIds.push(association.get('startClass').id);
          let startRole = association.get('startRole') || association.get('startClass.name');
          _this.associations.push({
            id: association.id,
            startRole: startRole,
            startClass:{
              id: association.get('startClass').id,
              name: association.get('startClass.name'),
            },
            endClass:{
              id: association.get('endClass').id,
              name: association.get('endClass.name'),
            },
          });
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
          _this.controller.setClassTree(_this.associations, _this.devClasses);
          _this.controller.setDefinition(_this.viewClassId, _this.definition);
//           alert('Assoc=' + JSON.stringify(_this.associations));
        }
        );

      },
      function(data) {
        alert('Error' + data);
      }
    );



    /*let builder = new  Builder(this.store, 'fd-dev-attribute').
    selectByProjection('EditListForm').
    where('class', FilterOperator.Eq, viewClassId);
    let _this = this;
    this.store.query('fd-dev-attribute', builder.build()).then(
      function(classAttrs) {
        let classAttributes = {};
        for (let i = 0; i < classAttrs.get('length'); i++) {
          let classAttr = classAttrs.objectAt(i);
          let name =  classAttr.get('name');
          classAttributes[name] = {
            type: classAttr.get('type'),
            defaultValue: classAttr.get('defaultValue'),
          };
         }
        let attributes = [];
        for (let i = 0; i < definition.length; i++) {
          let definition = definition[i];
          let propertyName = definition.propertyName;
          if (propertyName in classAttributes) {
            let classAttribute = classAttributes[propertyName];
            attributes.push({ name: propertyName, type: classAttribute.type, defaultValue: classAttribute.defaultValue});
          }
        }
        /*alert(JSON.stringify(attributes));
        controller.setAttributes(attributes);
      },
      function(data) {
        alert('Error' + data);
      }
    );*/

    return this._super(controller, model);
  }

});
