import Component from '@ember/component';
import FdReadonlyFromBackendMixin from '../../mixins/fd-readonly-from-backend';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import layout from '../../templates/components/fd-sheets/fd-sheets-tool-bar';

export default Component.extend(FdReadonlyFromBackendMixin, {
  layout,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Router service of current application.
    @property router
    @type RouterService
  */
  router: service(),

  /**
    Array button.

    @property sheetButtons
    @type Ember.A()
  */
  sheetButtons: undefined,

  /**
    Object visible button.

    @property buttonArray
    @type Ember.A()
  */
  buttonVisible: computed('sheetButtons', function() {
    let sheetButtons = this.get('sheetButtons');
    let buttons = {};
    sheetButtons.forEach((button) => {
      buttons[`${button}`] = true;
    });

    return buttons;
  }),

  /**
    Custom button visible.

    @property customButton
    @type Bool
  */
  customButtonVisible: false,

  /**
    Custom button title.

    @property customButton
    @type String
  */
  customButtonTitle: undefined,

  /**
    Share button value.

    @property shareSheetValue
    @type Object
  */
  shareSheetValue: undefined,

  /**
    Flag: indicates whether to show toolbar.

    @property toolbarVisible
    @type Bool
  */
  toolbarVisible: true,

  /**
    Flag: indicates whether property is readonly.

    @property readonlyMode
    @type Boolean
    @default false
   */
  readonlyMode: false,

  /**
    Flag: indicates whether to not show button for new model.

    @property isNewModel
    @type Bool
  */
  isNewModel: false,

  actions: {
    /**
      Closing sheet.

      @method actions.closeSheet
    */
    closeSheet() {
      let sheetComponentName = this.get('sheetComponentName');
      this.get('fdSheetService').closeSheet(sheetComponentName);
    },

    /**
      Expanding sheet.

      @method actions.expand
    */
    expand() {
      let sheetComponentName = this.get('sheetComponentName');
      this.get('fdSheetService').expand(sheetComponentName);
    },

    /**
      Saving changes.

      @method actions.save
    */
    save() {
      this.get('saveSheet')();
      this.set('readonlyMode', true);
    },

    /**
      Delete data.

      @method actions.delete
    */
    delete() {
      this.get('deleteSheet')();
    },

    /**
      Off readonlyMode.

      @method actions.edit
    */
    edit() {
      this.set('readonlyMode', false);
    },

    /**
      Copies the link to the clipboard.

      @method actions.share
    */
    share() {
      let host = this.get('router.location.location.host');
      let hash = this.get('router.location.location.hash');
      let stage = `?gotostage=${this.get('currentProjectContext').getCurrentStage()}`;
      let object = '';

      let shareSheetValue = this.get('shareSheetValue');
      if (!isNone(shareSheetValue)) {
        let gototype = shareSheetValue.get('constructor.modelName');
        if (gototype === 'fd-dev-class' || gototype === 'fd-dev-view') {
          hash = '#/fd-application-model';
        }

        object = `&gototype=${gototype}&gotoobj=${shareSheetValue.get('id')}`;
      }

      // Create new element
      var el = document.createElement('textarea');

      // Set value (string to be copied), set non-editable to avoid focus and move outside of view
      el.value =  `${host}${hash}${stage}${object}`;
      el.style = { display: 'none' };
      document.body.appendChild(el);

      // Select text inside element, copy text to clipboard and remove temporary element.
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },

    /**
      Custom button action.

      @method actions.customButtonAction
    */
    customButtonAction() {
      this.get('customButtonSheet')();
    },
  }
});
