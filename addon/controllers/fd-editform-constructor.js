import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['classId'],

  actions: {
    close() {
      this.transitionToRoute('fd-appstruct-form');
    },

    toggleConfigPanel() {
      if (this.toggleProperty('configPanelState')) {
        this.transitionToRoute('fd-editform-constructor.form-config-panel');
      } else {
        this.transitionToRoute('fd-editform-constructor');
      }
    },
  },
});
