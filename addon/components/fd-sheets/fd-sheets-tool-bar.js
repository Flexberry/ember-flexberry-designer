import Component from '@ember/component';
import FdReadonlyProjectMixin from '../../mixins/fd-readonly-project';
import FdShareFunctionMixin from '../../mixins/fd-share-function';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed, observer } from '@ember/object';
import { isNone } from '@ember/utils';
import layout from '../../templates/components/fd-sheets/fd-sheets-tool-bar';

export default Component.extend(FdReadonlyProjectMixin, FdShareFunctionMixin, {
  layout,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Expand icon.

    @property expandIcon
    @type String
    @default 'icon-guideline-arrows-resize'
  */
  expandIcon: 'icon-guideline-arrows-resize',

  /**
    Collapse icon.

    @property collapseIcon
    @type String
    @default 'icon-guideline-arrows-resize-minus'
  */
  collapseIcon: 'icon-guideline-arrows-resize-minus',

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
   Service for managing objects diagram.

   @property fdDiagramService
   @type {Class}
   @default Ember.inject.service()
   */
  fdDiagramService: service('fd-diagram-service'),

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
    Url video helper.

    @property sheetHelper
    @type String
  */
  sheetHelper: undefined,

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
    Flag: indicates whether sheet is expanded.

    @property isExpanded
    @type Boolean
   */
  isExpanded: computed('fdSheetService.sheetSettings.expanded.{class-sheet,diagram-sheet,edit-diagram-object-sheet}', function() {
    let sheetComponentName = this.get('sheetComponentName');
    return this.get(`fdSheetService.sheetSettings.expanded.${sheetComponentName}`);
  }),

  /**
    Flag: indicates whether to not show button for new model.

    @property isNewModel
    @type Bool
  */
  isNewModel: false,

  /**
    Flag: indicates whether to not show gen button.

    @property GenToolbarVisible
    @type Bool
  */
  genToolbarVisible: false,

  /**
    Flag: indicates whether to not show ai button.

    @property aiToolbarVisible
    @type Bool
  */
  aiToolbarVisible: false,

  /**
    Current sheet content value.
    @property contentSheetValue
    @type Object
  */
  contentSheetValue: undefined,

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
    Flag: indicates whether save button enabled.

    @property saveButtonEnabled
    @type Boolean
  */
  saveButtonEnabled: true,

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

  /**
    Callback success save item.

     @method successSaveModel
     @param {String} sheetName Sheet's name.
  */
  successSaveModel(sheetName) {
    let sheetComponentName = this.get('sheetComponentName');
    if (sheetComponentName === sheetName) {
      this.set('readonlyMode', true);
      this.get('fdLockService').deleteLock(this.get('contentSheetValue'), sheetComponentName);
    }
  },

  init() {
    this._super(...arguments);

    this.get('fdSheetService').on('successSaveModelTrigger', this, this.successSaveModel);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('readonlyMode', true);
    const sheetComponentName = this.get('sheetComponentName');
    const contentSheetValue = this.get('contentSheetValue');
    this.get('fdLockService').deleteLock(contentSheetValue, sheetComponentName);
    this.get('fdSheetService').off('successSaveModelTrigger', this, this.successSaveModel);
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
    share(event) {
      let origin = this.get('router.location.location.origin');
      let pathname = this.get('router.location.location.pathname');
      let hash = this.get('router.location.location.hash');

      let queryParamBegin = hash.indexOf('?');
      let hashWithoutQueryParams = (queryParamBegin > 0) ? hash.substring(0, queryParamBegin): hash;

      let stage = `?gotostage=${this.get('currentProjectContext').getCurrentStage()}`;
      let object = '';

      let contentSheetValue = this.get('contentSheetValue');
      if (!isNone(contentSheetValue)) {
        let gototype = contentSheetValue.get('constructor.modelName');
        if (gototype === 'fd-dev-class' || gototype === 'fd-dev-view') {
          hashWithoutQueryParams = '#/fd-application-model';
        }

        object = `&gototype=${gototype}&gotoobj=${contentSheetValue.get('id')}`;
      }

      let value =  `${origin}${pathname}${hashWithoutQueryParams}${stage}${object}`;
      this.copyInClipboardValue(value);
      this.showSharePopup(event);
    },

    /**
      Show diagramm dependencies of current class.

      @method actions.showDependencies
    */
    showDependencies(event) {
      const store = this.get('store');
      const stage = this.get('currentProjectContext').getCurrentStageModel();

      // Get current cad diagrams.
      const allCadDiagrams = store.peekAll('fd-dev-uml-cad');
      const cadDiagramsCurrentStage = allCadDiagrams.filterBy('subsystem.stage.id', stage.get('id'));
      const currentClassName = this.get('contentSheetValue.name');
      const currentClassNameStr = this.get('contentSheetValue.nameStr');

      let classDiagrams = A();

      classDiagrams.pushObjects(cadDiagramsCurrentStage.filter(function (diagram) {
        if (!isNone(diagram.caseObjectsString)) {
          return diagram.caseObjectsString.includes("Class:(" + currentClassName + ")") || 
                 diagram.caseObjectsString.includes("Class:(" + currentClassNameStr + ")");
        }
      }));

      this.set('classDiagrams', classDiagrams);

      let diagramsPopup = this.$(event.currentTarget.nextElementSibling);
      diagramsPopup.popup({
        on: 'click',
        position: 'bottom right',
        target: event.currentTarget,
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
      Trigger keypress logic.

      @method actions.duplicatedHotkeys
      @param {String} eventName event name.
    */
    duplicatedHotkeys(eventName) {
      this.get('fdDiagramService').triggerKeypressLogic(eventName);
    },

    /**
      Trigger generation for selected class logic.

      @method actions.generationForSelectedClass
    */
    generationForSelectedClass() {
      this.get('fdDiagramService').triggerGenForSelectedClassLogic();
    },

    /**
      Trigger generation ai class attributes logic.

      @method actions.aiGenAttributes
    */
    aiGenAttributes() {
      let sheetComponentName = this.get('sheetComponentName');
      let contentSheetValue = this.get('contentSheetValue');

      this.get('fdSheetService').aiGenAttributesLogic(sheetComponentName, contentSheetValue);
    },

    /**
      Custom button action.

      @method actions.customButtonAction
    */
    customButtonAction(action) {
      let actionType = typeof action;
      if (actionType === 'function') {
        action();
      } else if (actionType === 'string') {
        this.get(action)();
      } else {
        throw new Error('Unsupported action type for custom buttons.');
      }
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
