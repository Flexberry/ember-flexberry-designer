import Ember from 'ember';

export default Ember.Route.extend({
  appState: Ember.inject.service(),

  activate: function() {
    let _this = this;
    Ember.run.schedule('afterRender', this, function() {
      _this.get('appState').reset();
      _this.controller.send('printDiagram');
    });
  },
});
