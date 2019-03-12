// ui-popup component is removed, temporary replace "export { default } from 'ember-flexberry-designer/routes/fd-view-edit-form';" statement
// and make changes to appropriate controller and template.
import $ from 'jquery';
import { schedule } from '@ember/runloop';
import Route from 'ember-flexberry-designer/routes/fd-view-edit-form';

export default Route.extend({
  setupController(controller, model) {
    this._super(...arguments);

    schedule('afterRender', controller, function() {
      $(controller.get('closeRightPanelBtnSelector'))
      .popup();
    });
  }
});
