import Controller from '@ember/controller';
import EmberObject, { computed, observer, set } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { updateStrByObjects } from '../utils/fd-update-str-value';
import { translationMacro as t } from 'ember-i18n';

import FdSaveHasManyRelationshipsMixin from '../mixins/fd-save-has-many-relationships';

export default Controller.extend(FdSaveHasManyRelationshipsMixin, {

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  /**
    Service for managing the state of the application.

    @property appState
    @type AppStateService
  */
  appState: service(),

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Value selected entity.

    @property selectedElement
    @type Object
  */
  selectedElement: undefined,

  /**
    Value selected view.

    @property selectedView
    @type Object
  */
  selectedView: undefined,

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
    Sheet view name.

    @property sheetViewName
    @type String
    @default ''
  */
  sheetViewName: '',

  /**
    Flag: indicates whether to show create editing panel.

    @property isAddMode
    @type Bool
    @default false
  */
  isAddMode: false,

  /**
    Ember.observer, watching property `searchValue` and send action from 'fd-sheet' component.

    @method searchValueObserver
  */
  searchValueObserver: observer('searchValue', function() {
    let sheetComponentName = this.get('sheetComponentName');
    let fdSheetService = this.get('fdSheetService');
    if (fdSheetService.isVisible(sheetComponentName)) {
      fdSheetService.closeSheet(sheetComponentName);
    }

    this.closeViewSheet();
  }),

  /**
    Sheet title value.

    @method computedTitle
  */
  computedTitle: computed('isAddMode', 'i18n.locale', {
    get() {
      return this.get('isAddMode') ? t('components.fd-create-entity.caption') : this.get('selectedElement.model.data.name');
    },
    set(key, value) {
      if (!this.get('isAddMode')) {
        this.set('selectedElement.model.data.name', value);
      }

      return value;
    }
  }),

  /**
    Removes quotes from class stereotype.

    @method componentNamePart
  */
  componentNamePart: computed('selectedElement', function() {
    let selectedElement = this.get('selectedElement');
    if (!isNone(selectedElement)) {
      let stereotype = selectedElement.get('model.data.stereotype');
      if (isNone(stereotype)) {
        return 'implementation';
      }

      return stereotype.substring(1, stereotype.length - 1);
    }
  }),

  /**
    Update model for search

    @method filteredModel
  */
  filteredModel: computed('model', 'searchValue', function() {
    let searchStr = this.get('searchValue');
    let model = this.get('model');

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

    let newClasses = model.classes.filter(function(clazz) {
      let classes = filterFunction(clazz.settings);
      if (!isNone(classes)) {
        return clazz;
      }

      let editForms = clazz.editForms.some(filterFunction);
      let listForms = clazz.listForms.some(filterFunction);
      let parents = clazz.parents.some(filterFunction);
      let bs = !isNone(clazz.bs) ? filterFunction(clazz.bs) : null;

      if (editForms || listForms || parents || !isNone(bs)) {
        return clazz;
      }
    });

    let newModel = {
      classes: A(newClasses)
    };

    for (let prop in model) {
      if (prop !== 'classes') {
        let newdata = model[prop].filter(filterFunction);
        newModel[prop] = A(newdata);
      }
    }

    return newModel;
  }),

  init() {
    this._super(...arguments);

    this.get('fdSheetService').on('openSheetTriggered', this, this.openSheet);
    this.get('fdSheetService').on('closeSheetTriggered', this, this.closeSheet);
  },

  /**
    Deactivate item from selectedElement.

     @method deactivateListItem
  */
  deactivateListItem() {
    let selectedElement = this.get('selectedElement');
    if (!isNone(selectedElement)) {
      let model = selectedElement.get('model.data');
      model.rollbackAll();
      selectedElement.set('model.active', false);
    }
  },

  /**
    Update bs value in model.

     @method updateClassModel
  */
  updateClassModel(modelSelectedElement) {
    let stereotype = modelSelectedElement.get('stereotype');
    if (stereotype === '«implementation»' || stereotype === null) {
      let model = this.get('model');
      let classObj = model.classes.findBy('settings.data.id', modelSelectedElement.id);
      let bs = modelSelectedElement.get('businessServerClass');
      let bsModel = isNone(bs) ? null : { data: bs, active: false };
      set(classObj, 'bs', bsModel);
    }
  },

  /**
    Opening sheet.

     @method openSheet
     @param {String} sheetName Sheet's dbName
     @param {Object} currentItem Current list item
  */
  openSheet(sheetName, currentItem) {
    let sheetComponentName = this.get('sheetComponentName');
    if (sheetComponentName === sheetName) {
      this.deactivateListItem();
      this.closeViewSheet();
      this.set('selectedElement', currentItem);
      if (!isNone(currentItem)) {
        this.set('isAddMode', false);
      }
    }
  },

  /**
    Closing sheet.

     @method closeSheet
     @param {String} sheetName Sheet's dbName
  */
  closeSheet(sheetName) {
    let sheetComponentName = this.get('sheetComponentName');
    if (sheetComponentName === sheetName) {
      this.deactivateListItem();
      this.closeViewSheet();
      this.set('selectedElement', undefined);
    }
  },

  /**
    Closing view sheet.

     @method closeViewSheet
  */
  closeViewSheet() {
    let sheetViewName = this.get('sheetViewName');
    let fdSheetService = this.get('fdSheetService');
    if (fdSheetService.isVisible(sheetViewName)) {
      fdSheetService.closeSheet(sheetViewName);
      this.set('selectedView', undefined);
    }
  },

  /**
    Add in model new classes.

     @method addNewClassInModel
  */
  addNewClassInModel() {
    let model = this.get('selectedElement.model');
    switch (model.data.get('stereotype')) {
      case '«implementation»':
        this.get('model.classes').push({ settings: model, editForms: A(), listForms: A(), parents: A(), bs: null });
        break;
      case '«enumeration»':
        this.get('model.enums').push(model);
        break;
      case '«typedef»':
        this.get('model.typedefs').push(model);
        break;
      case '«type»':
        this.get('model.types').push(model);
        break;
      case '«application»':
        this.get('model.applications').push(model);
        break;
      case '«businessserver»':
        this.get('model.bs').push(model);
        break;
      case '«external»':
        this.get('model.externals').push(model);
        break;
      case '«externalinterface»':
        this.get('model.externalinterface').push(model);
        break;
      case '«interface»':
        this.get('model.interfaces').push(model);
        break;
      case '«userform»':
        this.get('model.userforms').push(model);
        break;
    }

    this.notifyPropertyChange('model');
  },

  actions: {

    /**
      Save 'selectedElement'.

       @method actions.save
    */
    save() {
      let model = this.get('selectedElement.model.data');
      this.get('appState').loading();
      updateStrByObjects(model);

      if (model.get('isNew')) {
        this.addNewClassInModel();
      }

      model.save()
      .then(() => this.saveHasManyRelationships(model))
      .then(() => {
        this.updateClassModel(model);
      })
      .catch((error) => {
        this.set('error', error);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Opening sheet 'view-sheet'.

       @method actions.openViewSheet
    */
    openViewSheet(view) {
      this.set('selectedView', view);
      this.get('fdSheetService').openSheet(this.get('sheetViewName'));
    },

    /**
      Open create class edit panel.

       @method actions.openCreateClassEditPanel
    */
    openCreateClassEditPanel() {
      this.set('isAddMode', true);
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'));
    },

    /**
      Create new class.

       @method actions.createClass
       @param {String} stereotype stereotype
    */
    createClass(stereotype) {
      this.deactivateListItem();
      let store = this.get('store');
      let currentStage = this.get('currentProjectContext').getCurrentStageModel();
      let newClass = store.createRecord('fd-dev-class', {
        stage: currentStage,
        caption: '',
        description: '',
        name: '',
        nameStr: '',
        stereotype: stereotype
      });

      let model = { data: newClass, active: true };

      this.set('isAddMode', false);
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'), EmberObject.create({ model: model }));
    },

    /**
      Delete selected class.

       @method actions.delete
    */
    delete() {

    },
  }
});
