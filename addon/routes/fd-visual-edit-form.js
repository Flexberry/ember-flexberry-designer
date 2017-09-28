import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let FdVisualEditForm = this.get('fd-visual-edit-form');
    return FdVisualEditForm;
  }
});
