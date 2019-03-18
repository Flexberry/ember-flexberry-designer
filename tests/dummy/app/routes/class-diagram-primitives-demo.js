import Route from '@ember/routing/route';
import { schedule } from '@ember/runloop';
import { inject } from '@ember/service';

export default Route.extend({
  appState: inject(),

  activate: function() {
    let _this = this;
    schedule('afterRender', this, function() {
      _this.get('appState').reset();
      _this.controller.send('printDiagram');
    });
  },
});
