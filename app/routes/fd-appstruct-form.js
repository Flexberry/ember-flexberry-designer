// ui-popup component is removed, temporary replace "export { default } from 'ember-flexberry-designer/routes/fd-appstruct-form';" statement
// and make changes to appropriate controller and template.
import $ from 'jquery';
import Ember from 'ember';
import Route from 'ember-flexberry-designer/routes/fd-appstruct-form';

export default Route.extend({
  setupController(controller, model) {
    this._super(...arguments);

    controller.setCloseRightPanelBtnMessage();

    Ember.run.schedule('afterRender', controller, function() {
      $(controller.get('closeRightPanelBtnSelector'))
      .popup();
    });
  }
});
