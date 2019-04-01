// ui-popup component is removed, temporary replace "export { default } from 'ember-flexberry-designer/routes/fd-appstruct-form';" statement
// and make changes to appropriate controller and template.
import $ from 'jquery';
import Route from 'ember-flexberry-designer/routes/fd-appstruct-form';
import { schedule } from '@ember/runloop';

export default Route.extend({
  // eslint-disable-next-line no-unused-vars
  setupController(controller, model) {
    this._super(...arguments);

    controller.setCloseRightPanelBtnMessage();

    schedule('afterRender', controller, function() {
      $(controller.get('closeRightPanelBtnSelector'))
      .popup();
    });
  }
});
