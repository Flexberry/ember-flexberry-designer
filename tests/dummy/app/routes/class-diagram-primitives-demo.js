import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    let _this = this;
    Ember.run.schedule('afterRender', this, function() {
      _this.controller.send('printDiagram');
    });
  },
});
