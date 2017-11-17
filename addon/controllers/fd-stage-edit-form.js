import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import { Query } from 'ember-flexberry-data';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';

export default EditFormController.extend({
  parentRoute: 'fd-stage-list-form',

  store: Ember.inject.service('store'),

  _storageType: Ember.computed(function() {
    let currentStage = this.get('model.id');

    let stageEqualNull = new SimplePredicate('stage', '==', null);
    let stageEqualCurrentStage = new SimplePredicate('stage', '==', currentStage);
    let condition = stageEqualNull.or(stageEqualCurrentStage);

    let store = this.get('store');

    let builder = new Query.Builder(store)
      .from('fd-storage-type')
      .selectByProjection('EditFormView')
      .where(condition);

    return store.query('fd-storage-type', builder.build()).then(function(data) {
      let results = data.map(item => item.get('shortName'));
      return results;
    });
  })
});
