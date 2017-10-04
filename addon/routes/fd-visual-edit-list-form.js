import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder } = Query;

export default Ember.Route.extend({

  formId: null,

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
    select('id,name,description,stereotype,containersStr,attributes,attributes.name').
    byId(this.formId);
    let promise = this.store.query('fd-dev-class', builder.build());
    return promise;
  },

  setupController: function (controller, model) {
    model.listform = model.nextObject(0);
    model.editControl = {};
    let attributes = controller.attributes;
    attributes.sort(function(a, b) { return a.orderNum - b.orderNum; });
    attributes[0].firstPosition = true;
    attributes[attributes.length - 1].lastPosition = true;
    model.listform.listAttributes = attributes;
    model.editControl.name = 'attribut1';
    return this._super(controller, model);
  }

});
