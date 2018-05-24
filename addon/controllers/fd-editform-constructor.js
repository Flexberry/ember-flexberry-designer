import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['classId'],

  actions: {
    close() {
      this.transitionToRoute('fd-appstruct-form');
    }
  }
});
