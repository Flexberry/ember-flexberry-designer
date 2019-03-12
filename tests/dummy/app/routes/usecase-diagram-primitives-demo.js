import Route from '@ember/routing/route';
import { schedule } from '@ember/runloop';

export default Route.extend({
  activate: function() {
    let _this = this;
    schedule('afterRender', this, function() {
      _this.controller.send('printDiagram');
    });
  },
});
