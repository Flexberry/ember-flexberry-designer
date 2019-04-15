import Route from '@ember/routing/route';
import { run } from '@ember/runloop';
import 'ember-flexberry-designer/utils/fd-deployment-diagram-primitives';

export default Route.extend({
  activate: function() {
    let _this = this;
    run.schedule('afterRender', this, function() {
      _this.controller.send('printDiagram');
    });
  },
});
