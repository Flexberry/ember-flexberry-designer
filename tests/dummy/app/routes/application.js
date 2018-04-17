import Ember from 'ember';
import ModalApplicationRouteMixin from 'ember-flexberry/mixins/modal-application-route';

export default Ember.Route.extend(ModalApplicationRouteMixin, {

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  activate: function() {
    let context = this.get('currentProjectContext');

    if (context.singleStageMode) {
      this.transitionTo('fd-appstruct-form');
    } else {
      this.transitionTo('fd-configuration-list-form');
    }
  }
});
