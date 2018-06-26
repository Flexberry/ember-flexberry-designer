import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['formId', 'classId'],

  actions: {
    close() {
      this.transitionToRoute('fd-appstruct-form');
    }
  }

});
