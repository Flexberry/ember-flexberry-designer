import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
const { Builder, FilterOperator } = Query;

export default Ember.Route.extend({

  /*currentProjectContext: Ember.inject.service('fd-current-project-context'),*/

  model: function() {
    /*let stagePk = this.get('currentProjectContext').getCurrentStage();
    let p1 = new Query.SimplePredicate('stage.id', FilterOperator.Eq, stagePk);*/
    let p2 = new Query.SimplePredicate('stereotype', Query.FilterOperator.Eq, null);
    let builder = new  Builder(this.store, 'fd-dev-class').
    select('id,name,description,stereotype,containersStr,formViews,formViews.view,formViews.view.class,formViews.view.class.id,stage,stage.id').
    where(p2);  //FOR DEBUGGING GOALS
    /*where(p1.and(p2));  //CORRECT CONDITION*/
    let promise = this.store.query('fd-dev-class', builder.build());
    return promise;
  },

  setupController: function (controller, model) {
    model.listforms = [];
    let n = model.get('length');
    for (let i = 0; i < n; i++) {
      let record = model.nextObject(i);
      model.listforms.push({ id: record.get('id'), name: record.get('name'), description: record.get('description') }) ;
    }

    return this._super(controller, model);
  }

});
