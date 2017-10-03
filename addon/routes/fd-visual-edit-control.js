import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let FdVisualEditControl = this.get('fd-visual-edit-control');
    return FdVisualEditControl;
  }
});
