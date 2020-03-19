import Component from '@ember/component';
import FdReadonlyProjectMixin from '../../mixins/fd-readonly-project';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed, observer } from '@ember/object';
import { isNone } from '@ember/utils';
import layout from '../../templates/components/fd-sheets/fd-sheets-tool-bar';
import { later } from '@ember/runloop';

export default Component.extend(FdReadonlyProjectMixin, {
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
   Service for managing locks.

   @property fdLockService
   @type {Class}
   @default service()
   */
  fdLockService: service(),

  /**
   Service for managing dialog windows.

   @property fdDialogService
   @type {Class}
   @default service()
   */
  fdDialogService: service(),

  /**
    Router service of current application.
    @property router
    @type RouterService
  */
  router: service(),

  /**
    @property store
    @type Service
  */
  store: service(),

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

  /**
    Table headers for dependencies popup.

    @property tableViewDiagrams
    @type Array
  */
  tableViewDiagrams: computed(() => (
    A([{
      columnCaption: 'components.fd-sheets-tool-bar.dependencies-panel-title',
      columnProperty: 'name',
    }])
  )),

  /**
    Array of diagrams where current class exists.

    @property classDiagrams
    @type Array
  */
  classDiagrams: null,

  /**
    Update locks.

    @method readonlyModeObserver
  */
  readonlyModeObserver: observer('readonlyMode', function() {
    const readonlyMode = this.get('readonlyMode');
    if (!readonlyMode) {
      const _this = this;
      const lockService = this.get('fdLockService');
      const refreshLockTime = lockService.getRefreshLockTime();
      const sheetComponentName = _this.get('sheetComponentName');
      const contentSheetValue= _this.get('contentSheetValue');
      lockService.createLock(contentSheetValue, sheetComponentName);
      setTimeout(function tick() {
        if (!_this.get('readonlyMode'))  {
          lockService.createLock(contentSheetValue, sheetComponentName);
          setTimeout(tick, refreshLockTime);
        }
      }, refreshLockTime);
    }
  }),

  willDestroyElement() {
    this._super(...arguments);
    this.set('readonlyMode', true);
    const sheetComponentName = this.get('sheetComponentName');
    const contentSheetValue = this.get('contentSheetValue');
    this.get('fdLockService').deleteLock(contentSheetValue, sheetComponentName);
  },

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
      let sheetComponentName = this.get('sheetComponentName');
      this.get('fdLockService').deleteLock(this.get('contentSheetValue'), sheetComponentName);
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
      let _this = this;

      let sheetComponentName = this.get('sheetComponentName');
      this.get('fdLockService').checkLock(this.get('contentSheetValue'), sheetComponentName).then(result => {
        if (result && !result.Acquired) {
          _this.set('readonlyMode', false);
        } else {
          _this.get('fdDialogService').showErrorMessage(this.get('i18n').t('components.fd-sheets-tool-bar.object-locked').toString() + (result ? result.UseName : ''));
        }
      });
    },

    /**
      Copies the link to the clipboard.

      @method actions.share
    */
    share() {
      let origin = this.get('router.location.location.origin');
      let pathname = this.get('router.location.location.pathname');
      let hash = this.get('router.location.location.hash');
      let stage = `?gotostage=${this.get('currentProjectContext').getCurrentStage()}`;
      let object = '';

      let contentSheetValue = this.get('contentSheetValue');
      if (!isNone(contentSheetValue)) {
        let gototype = contentSheetValue.get('constructor.modelName');
        if (gototype === 'fd-dev-class' || gototype === 'fd-dev-view') {
          hash = '#/fd-application-model';
        }

        object = `&gototype=${gototype}&gotoobj=${contentSheetValue.get('id')}`;
      }

      // Create new element
      var el = document.createElement('textarea');

      // Set value (string to be copied), set non-editable to avoid focus and move outside of view
      el.value =  `${origin}${pathname}${hash}${stage}${object}`;
      el.style = { display: 'none' };
      document.body.appendChild(el);

      // Select text inside element, copy text to clipboard and remove temporary element.
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      let sharePopup = this.$('.share.button');
      sharePopup.popup({
        on: 'manual',
        inline: true
      }).popup('show');
      this.set('copied', true);
      later(this, (function() {
        sharePopup.popup('hide');
        this.set('copied', false);
      }), 2000);
    },

    /**
      Show diagramm dependencies of current class.

      @method actions.showDependencies
    */
    showDependencies() {
      const store = this.get('store');
      const stage = this.get('currentProjectContext').getCurrentStageModel();

      // Get current cad diagrams.
      const allCadDiagrams = store.peekAll('fd-dev-uml-cad');
      const cadDiagramsCurrentStage = allCadDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
      const currentClassName = this.get('contentSheetValue.name');

      let classDiagrams = A();

      classDiagrams.pushObjects(cadDiagramsCurrentStage.filter(function (diagram) {
        if (!isNone(diagram.caseObjectsString)) {
          return diagram.caseObjectsString.includes("Class:(" + currentClassName + ")"); 
        }
      }));

      this.set('classDiagrams', classDiagrams);

      let diagramsPopup = this.$('.ui.popup');
      diagramsPopup.popup({
        on: 'click',
        position: 'bottom right',
        target: '.dependencies.button',
      }).popup('show');      
    },

    /**
      Transition to dependent diagram.

      @method actions.openDependentDiagram
    */
    openDependentDiagram(diagram) {
      if (!isNone(diagram)) {
        const gototype = diagram.get('constructor.modelName');

        this.get('router').transitionTo('fd-diagrams', {
          queryParams: {
            gototype: gototype,
            gotoobj: diagram.get('id')
          }
        });
      }
    },

    /**
      Custom button action.

      @method actions.customButtonAction
    */
    customButtonAction() {
      this.get('customButtonSheet')();
    },

    /**
      Print button action.

      @method actions.print
    */
    print() {
      let model = this.get('targetObject.selectedValue.data');
      window.open(`#/fd-print-form?gotostage=${model.get('subsystem.stage.id')}&gototype=${model.get('constructor.modelName')}&gotoobj=${model.get('id')}&inframe=1` );
    },
  }
});
