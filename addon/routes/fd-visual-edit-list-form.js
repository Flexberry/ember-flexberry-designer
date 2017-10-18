import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Route.extend({

  formId: null,

  listform: {
    listAttributes: {}
  },

  editControl: {},

  queryParams: {
    formId: {
      refreshModel: false
    }
  },

  beforeModel: function(params) {
    this.formId = params.queryParams.formId;
  },

  /*currentProjectContext: Ember.inject.service('fd-current-project-context'),*/

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
    let devClass = model.objectAt(0);
    let formView = devClass.get('formViews').objectAt(0);
    let view = formView.get('view');
    let definitions = controller._parseDefinition(view.get('definition'));
    let viewClassId = view.get('class.id');
    let builder = new  Builder(this.store, 'fd-dev-attribute').
    selectByProjection('EditListForm').
    where('class', FilterOperator.Eq, viewClassId);
    /*let _this = this;*/
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
        for (let i = 0; i < definitions.length; i++) {
          let definition = definitions[i];
          let propertyName = definition.propertyName;
          if (propertyName in classAttributes) {
            let classAttribute = classAttributes[propertyName];
            attributes.push({ name: propertyName, type: classAttribute.type, defaultValue: classAttribute.defaultValue });
          }
        }
        /*alert(JSON.stringify(attributes));*/
        controller.setAttributes(attributes);
      },
      function(data) {
        alert('Error' + data);
      }
    );

    return this._super(controller, model);
  }

});
