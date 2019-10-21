import Controller from '@ember/controller';
import EmberObject, { computed, observer, set } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { updateStrByObjects } from '../utils/fd-update-str-value';
import { translationMacro as t } from 'ember-i18n';
import FdSheetCloseConfirm from '../mixins/fd-sheet-close-confirm';
import $ from 'jquery';
import { resolve, reject } from 'rsvp';
import { createClassPrimitive, deletePrimitives } from '../utils/fd-update-class-diagram';

import FdSaveHasManyRelationshipsMixin from '../mixins/fd-save-has-many-relationships';

export default Controller.extend(FdSaveHasManyRelationshipsMixin, FdSheetCloseConfirm, {

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
  computedTitle: computed('isAddMode', 'i18n.locale', 'selectedElement', {
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
      if (isBlank(stereotype)) {
        return 'implementation';
      }

      return stereotype.substring(1, stereotype.length - 1);
    }
  }),

  /**
    Update model for sort

    @method sortModel
  */
  sortModel: computed('model', function() {
    let model = this.get('model');
    let newClasses = model.classes.sortBy('settings.data.name');
    let newModel = {
      classes: A(newClasses)
    };

    for (let prop in model) {
      if (prop !== 'classes') {
        let newdata = model[prop].sortBy('data.name');
        newModel[prop] = A(newdata);
      }
    }

    return newModel;
  }),

  /**
    Update model for search

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
    if (stereotype === '«implementation»' || isBlank(stereotype)) {
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
    let sheetViewName = this.get('sheetViewName');
    if (sheetComponentName === sheetName) {
      this.deactivateListItem();
      this.closeViewSheet();
      this.set('selectedElement', undefined);
    } else if (sheetViewName === sheetName) {
      let selectedView = this.get('selectedView');
      if (!isNone(selectedView)) {
        selectedView.rollbackAll();
        this.set('selectedView', undefined);
      }
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
    }
  },

  /**
    Find array in model.

     @method getModelArrayByStereotype
     @param {Object} model model object
  */
  getModelArrayByStereotype(model) {
    let findArray;
    switch (model.get('stereotype')) {
      case null:
      case '':
      case '«implementation»':
        findArray = this.get('model.classes');
        break;
      case '«listform»': {
        let dataObjectId = model.get('formViews.firstObject.view.class.id');
        let classArray = this.get('model.classes').findBy('settings.data.id', dataObjectId);
        findArray = classArray.listForms;
        break;
      }
      case '«editform»': {
        let dataObjectId = model.get('formViews.firstObject.view.class.id');
        let classArray = this.get('model.classes').findBy('settings.data.id', dataObjectId);
        findArray = classArray.editForms;
        break;
      }
      case '«enumeration»':
        findArray = this.get('model.enums');
        break;
      case '«typedef»':
        findArray = this.get('model.typedefs');
        break;
      case '«type»':
        findArray = this.get('model.types');
        break;
      case '«application»':
        findArray = this.get('model.applications');
        break;
      case '«businessserver»':
        findArray = this.get('model.bs');
        break;
      case '«external»':
        findArray = this.get('model.externals');
        break;
      case '«externalinterface»':
        findArray = this.get('model.externalinterface');
        break;
      case '«interface»':
        findArray = this.get('model.interfaces');
        break;
      case '«userform»':
        findArray = this.get('model.userforms');
        break;
      case '«maplayer»':
        findArray = this.get('model.maplayers');
        break;
      case '«maplayerstyle»':
        findArray = this.get('model.maplayerstyles');
        break;
      default:
        findArray = this.get('model.userstereotypes');
    }

    return findArray;
  },

  /**
    Add in model new classes.

     @method addNewClassInModel
  */
  addNewClassInModel() {
    let model = this.get('selectedElement.model');
    let modelHash = this.getModelArrayByStereotype(model.data);

    if (model.data.get('stereotype') === '«implementation»') {
      modelHash.pushObject({ settings: model, editForms: A(), listForms: A(), parents: A(), bs: null });
    } else {
      modelHash.pushObject(model);
    }

    this.notifyPropertyChange('model');
  },

  /**
    Check data for correctness.

    @method validateData
    @param {Object} model class model.
  */
  validateData(model) {
    let modelName = model.get('name');

    if (isBlank(modelName)) {
      return reject({ message: this.get('i18n').t('forms.fd-application-model.error-message.empty-class').toString() });
    }

    if ((model.get('stereotype') === '«editform»' || model.get('stereotype') === '«listform»') && isNone(model.get('formViews.firstObject.view'))) {
      return reject({ message: this.get('i18n').t('forms.fd-application-model.error-message.view-form').toString() });
    }

    if (model.get('isNew')) {
      model.set('nameStr', model.get('name'));
      // Get current classes.
      let allClasses = this.get('store').peekAll('fd-dev-class');
      let classesCurrentStage = allClasses.filterBy('stage.id', this.get('currentProjectContext').getCurrentStage());
      let currentClass = A(classesCurrentStage).find((a) => {
        return a.get('name') === modelName && !isNone(a.get('id'));
      });

      if (!isNone(currentClass)) {
        return reject({ message: this.get('i18n').t('forms.fd-application-model.error-message.exist-class').toString() });
      }
    }

    return resolve();
  },

  actions: {

    /**
      Save 'selectedElement'.

       @method actions.save
       @param {Boolean} closeAfter close after save
    */
    save(closeAfter) {
      const selectedElement = this.get('selectedElement');
      let model = selectedElement.get('model.data');
      this.get('appState').loading();
      updateStrByObjects(model);

      let isNew = model.get('isNew');
      this.validateData(model)
      .then(() => model.save())
      .then(() => this.saveHasManyRelationships(model))
      .then(() => {
        if (isNew) {
          this.addNewClassInModel();
          let diagram = createClassPrimitive(this.get('store'), this.get('currentProjectContext'), model);
          return diagram.save();
        }

        return resolve();
      })
      .then(() => {
        this.updateClassModel(model);
        if (closeAfter) {
          this.confirmClose(this.get('sheetComponentName'));
        }
      })
      .catch((error) => {
        this.set('isError', true);
        this.set('messageText', error.message);
        this.set('show', true);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Save 'selectedView'.

       @method actions.saveView
    */
    saveView() {
      let view = this.get('selectedView');
      this.get('appState').loading();
      view.save()
      .catch((error) => {
        this.set('isError', true);
        this.set('messageText', error.message);
        this.set('show', true);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Opening sheet 'view-sheet'.

       @method actions.openViewSheet
       @param {Object} view view
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
       @param {Object} dataobject dataobject for list and edit form.
    */
    createClass(stereotype, dataobject) {
      this.deactivateListItem();
      this.set('selectedElement', undefined);
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

      if (!isBlank(dataobject) && !(dataobject instanceof $.Event)) {
        let formView = store.createRecord('fd-dev-form-view', {
          view: null,
          orderNum: 1
        });

        newClass.set('formViews', [formView]);
      }

      let model = { data: newClass, active: true };

      this.set('isAddMode', false);
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'), EmberObject.create({ model: model, dataobject: dataobject }));
    },

    /**
      Delete selected class.

       @method actions.delete
    */
    delete() {
      const store = this.get('store');
      let selectedElement = this.get('selectedElement.model.data');
      let modelHash = this.getModelArrayByStereotype(selectedElement);

      let deleteObject;
      let deleteModels = A();
      let stereotype = selectedElement.get('stereotype');
      if (stereotype === '«businessserver»') {
        let bsInClass = this.get('model.classes').filterBy('bs.data.id', selectedElement.id);
        if (bsInClass.length > 0) {
          this.set('isError', true);
          this.set('messageText', this.get('i18n').t('forms.fd-application-model.error-message.exist-class').toString() + A(bsInClass).get('firstObject.settings.data.name'));
          this.set('show', true);
          return;
        }
      }

      if (stereotype === '«implementation»' || isBlank(stereotype)) {
        let deleteObjectClass = modelHash.findBy('settings.data.id', selectedElement.id);
        deleteModels.pushObjects(deleteObjectClass.listForms);
        deleteModels.pushObjects(deleteObjectClass.editForms);
        deleteObject = deleteObjectClass.settings;
        modelHash.removeObject(deleteObjectClass);
      } else {
        deleteObject = modelHash.findBy('data.id', selectedElement.id);
        modelHash.removeObject(deleteObject);
      }

      this.get('appState').loading();

      deleteModels.pushObject(deleteObject);
      let modelsForBatchUpdate = deleteModels.map((a) => {
        let data = a.data;
        data.deleteRecord();

        return data;
      });

      let primitivesOnDelete = deletePrimitives(store, this.get('currentProjectContext'), deleteModels.map((a) => a.data));
      A(modelsForBatchUpdate).pushObjects(primitivesOnDelete);

      store.batchUpdate(modelsForBatchUpdate)
      .then(() => {
        this.set('selectedElement', undefined);
        this.get('fdSheetService').closeSheet(this.get('sheetComponentName'));
      })
      .catch((error) => {
        this.set('isError', true);
        this.set('messageText', error.message);
        this.set('show', true);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Delete selected view.

       @method actions.deleteView
    */
    deleteView() {
      let view = this.get('selectedView');

      this.get('appState').loading();
      view.destroyRecord()
      .then(() => {
        this.set('selectedView', undefined);
        this.get('fdSheetService').closeSheet(this.get('sheetViewName'));
      })
      .catch((error) => {
        this.set('isError', true);
        this.set('messageText', error.message);
        this.set('show', true);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    }
  }
});
