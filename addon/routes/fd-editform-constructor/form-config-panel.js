import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this.render({
      into: 'application',
      outlet: 'right-sidebar',
      controller: this.controllerFor('fd-editform-constructor'),
    });
  },
});
