import Controller from '@ember/controller';

export default Controller.extend({

  queryParams: ['formId', 'classId'],

  actions: {
    close() {
      this.transitionToRoute('fd-appstruct-form');
    }
  }

});
