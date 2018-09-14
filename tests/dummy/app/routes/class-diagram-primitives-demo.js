import Ember from 'ember';
import 'ember-flexberry-designer/utils/fd-class-diagram-primitives';
import 'ember-flexberry-designer/utils/fd-diagram-primitives-views/fd-class-diagram-primitives-views';

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
