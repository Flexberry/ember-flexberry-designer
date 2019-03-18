import Route from '@ember/routing/route';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Route.extend({
  appState: service(),

  activate: function() {
    let _this = this;
    run.schedule('afterRender', this, function() {
      _this.get('appState').reset();
      _this.controller.send('printDiagram');
    });
  },
});
