import Ember from 'ember';
import ListFormController from 'ember-flexberry/controllers/list-form';
const { getOwner } = Ember;

export default ListFormController.extend({
  /**
    Name of related edit form route.

    @property editFormRoute
    @type String
    @default 'fd-generation-process-form'
   */
  editFormRoute: 'fd-generation-process-form',

  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: Ember.inject.service(),

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  generationService: Ember.inject.service('fd-generation'),

  /**
    Property to form array of special structures of custom user buttons.

    @property customButtons
    @type Array
   */
  customButtons: Ember.computed('i18n.locale', function() {
    let i18n = this.get('i18n');
    return [{
      buttonName: i18n.t('forms.fd-generation-list-form.generation-button.caption'),
      buttonAction: 'generationStartButtonClick',
      buttonClasses: 'generation-start-button',
      buttonTitle: i18n.t('forms.fd-generation-list-form.generation-button.title')
    }];
  }),

  actions: {
    /**
      Handler for click on generate button.

      @method actions.generationStartButtonClick
     */
    generationStartButtonClick() {
      let _this = this;
      _this.get('appState').loading();
      let stagePk = _this.get('currentProjectContext').getCurrentStage();
      let adapter = getOwner(this).lookup('adapter:application');

      adapter.callFunction('Generate', { project: stagePk.toString() }, null, { withCredentials: true },
      (result) => {
        _this.set('generationService.lastGenerationToken', result);
        result = result || {};
        _this.get('appState').reset();
        _this.transitionToRoute(_this.get('editFormRoute'), Ember.get(result, 'value'));
      },
      () => {
        _this.get('appState').reset();
        _this.set('error', new Error(_this.get('i18n').t('forms.fd-generation-process-form.connection-error-text')));
      });
    }
  },

  /**
    Method to get type and attributes of a component,
    which will be embeded in object-list-view cell.

    @method getCellComponent.
    @param {Object} attr Attribute of projection property related to current table cell.
    @param {String} bindingPath Path to model property related to current table cell.
    @param {Object} modelClass Model class of data record related to current table row.
    @return {Object} Object containing name & properties of component, which will be used to render current table cell.
    { componentName: 'my-component',  componentProperties: { ... } }.
  */
  getCellComponent: function(attr, bindingPath) {
    if (bindingPath === 'startTime' || bindingPath === 'endTime') {
      return {
        componentName: 'object-list-view-cell',
        componentProperties: {
          dateFormat: 'DD.MM.YYYY, HH:mm:ss'
        }
      };
    }

    return this._super(...arguments);
  },
});
