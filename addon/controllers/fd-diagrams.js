import Controller from '@ember/controller';
import FdSheetCloseConfirm from '../mixins/fd-sheet-close-confirm';
import FdReadonlyProjectMixin from '../mixins/fd-readonly-project';
import EmberObject, { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import { isBlank, isNone } from '@ember/utils';
import { A } from '@ember/array';

export default Controller.extend(FdSheetCloseConfirm, FdReadonlyProjectMixin, {

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Value search input.

    @property searchValue
    @type String
    @default ''
  */
  searchValue: '',

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default ''
  */
  sheetComponentName: '',

  /**
    Flag: indicates whether to show create editing panel.

    @property isAddMode
    @type Bool
    @default false
  */
  isAddMode: false,

  /**
    Selected group.

    @property groupValue
    @type String
  */
  groupValue: undefined,

  /**
    Array groups.

    @property groupArray
    @type Array
  */
  groupArray: computed('i18n.locale', function() {
    return A([
      this.get('i18n').t('forms.fd-diagrams.all-diagrams').toString(),
      this.get('i18n').t('forms.fd-diagrams.systems').toString(),
      this.get('i18n').t('forms.fd-diagrams.ad').toString(),
      this.get('i18n').t('forms.fd-diagrams.cad').toString(),
      this.get('i18n').t('forms.fd-diagrams.cod').toString(),
      this.get('i18n').t('forms.fd-diagrams.dpd').toString(),
      this.get('i18n').t('forms.fd-diagrams.sd').toString(),
      this.get('i18n').t('forms.fd-diagrams.std').toString(),
      this.get('i18n').t('forms.fd-diagrams.ucd').toString()
    ]);
  }),

  /**
    Flag: indicates whether to group by system.

    @property groupBySystems
  */
  groupBySystems: computed('groupValue', function() {
    let groupValue = this.get('groupValue');
    return !isNone(groupValue) && groupValue === this.get('i18n').t('forms.fd-diagrams.systems').toString();
  }),

  /**
    Ember.observer, watching property `searchValue` and send action from 'fd-sheet' component.

    @method searchValueObserver
  */
  searchValueObserver: observer('searchValue', 'groupValue', function() {
    let sheetComponentName = this.get('sheetComponentName');
    let fdSheetService = this.get('fdSheetService');
    if (fdSheetService.isVisible(sheetComponentName)) {
      fdSheetService.closeSheet(sheetComponentName);
    }
  }),

  /**
    Update model for sort.

    @method sortModel
  */
  sortModel: computed('model', 'groupBySystems', function() {
    let model = this.get('model');

    if (this.get('groupBySystems')) {
      let modelBySystem = {};
      for (let prop in model) {
        model[prop].forEach((diagram) => {
          let system = diagram.data.get('subsystem.name');
          if (isNone(modelBySystem[system])) {
            modelBySystem[system] = A([diagram]);
          } else {
            modelBySystem[system].pushObject(diagram);
          }
        });
      }

      model = modelBySystem;
    }

    let newModel = {};
    for (let prop in model) {
      let newdata = model[prop].sortBy('data.name');
      newModel[prop] = A(newdata);
    }

    return newModel;
  }),

  /**
    Update model for search.

    @method filteredModel
  */
  filteredModel: computed('sortModel', 'searchValue', function() {
    let searchStr = this.get('searchValue');
    let model = this.get('sortModel');

    if (isBlank(searchStr)) {
      return model;
    }

    searchStr = searchStr.trim().toLocaleLowerCase();
    let filterFunction = function(item) {
      let name = item.data.get('name');
      if (!isNone(name) && name.toLocaleLowerCase().indexOf(searchStr) !== -1) {
        return item;
      }
    };

    let newModel = {};

    for (let prop in model) {
      let newdata = model[prop].filter(filterFunction);
      newModel[prop] = A(newdata);
    }

    return newModel;
  }),

  init() {
    this._super(...arguments);

    this.set('groupValue', this.get('i18n').t('forms.fd-diagrams.all-diagrams').toString());
  },

  actions: {
    /**
      Create new diagram.

       @method actions.createDiagram
       @param {String} modelNamePart Part modelName.
    */
    createDiagram(modelNamePart) {
      let store = this.get('store');
      let currentSystem = this.get('currentProjectContext').getAutogeneratedSystemModel();
      let newDiagram = store.createRecord(`fd-dev-uml-${modelNamePart}`, {
        name: '',
        primitivesJsonString: '[]',
        caseObjectsString: '',
        subsystem: currentSystem
      });

      let model = { data: newDiagram, active: true };

      this.set('isAddMode', false);
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'), EmberObject.create({ model: model }));
    },

    /**
      Open create diagrams edit panel.

       @method actions.openCreateDiagramsEditPanel
    */
    openCreateDiagramsEditPanel() {
      this.set('isAddMode', true);
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'));
    },

    /**
      This method will notify all observers that the model changed value.

       @method actions.updateModel
    */
    updateModel() {
      this.notifyPropertyChange('model');
    }
  }
});
