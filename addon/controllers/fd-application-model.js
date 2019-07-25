import Controller from '@ember/controller';
import EmberObject, { computed, observer, set } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { updateStrByObjects } from '../utils/fd-update-str-value';
import { translationMacro as t } from 'ember-i18n';
import { resolve } from 'rsvp';
import $ from 'jquery';

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
      .then(() => {
        let stereotype = model.get('stereotype');
        if (stereotype === '«editform»' || stereotype === '«listform»') {
          return model.get('formViews.firstObject.view').save();
        }

        return resolve();
      })
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
      Save 'selectedView'.

       @method actions.saveView
    */
    saveView() {
      let view = this.get('selectedView');
      this.get('appState').loading();
      view.save()
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
        let view = store.createRecord('fd-dev-view', {
          class: dataobject,
          name: '',
          definition: A()
        });

        let formView = store.createRecord('fd-dev-form-view', {
          class: dataobject,
          view: view,
          orderNum: 1
        });

        newClass.set('formViews', [formView]);
      }

      let model = { data: newClass, active: true };

      this.set('isAddMode', false);
      this.get('fdSheetService').openSheet(this.get('sheetComponentName'), EmberObject.create({ model: model }));
    },

    /**
      Delete selected class.

       @method actions.delete
    */
    delete() {
      let selectedElement = this.get('selectedElement.model.data');
      let modelHash = this.getModelArrayByStereotype(selectedElement);

      let deleteObject;
      let deleteModels = A();
      let stereotype = selectedElement.get('stereotype');
      if (stereotype === '«businessserver»') {
        let bsInClass = this.get('model.classes').filterBy('bs.data.id', selectedElement.id);
        if (bsInClass > 0) {
          throw new Error('BusinessServer используется другими классами: ');
        }
      }

      if (stereotype === '«implementation»' || stereotype === null) {
        let deleteObjectClass = modelHash.findBy('settings.data.id', selectedElement.id);
        deleteModels.pushObjects(deleteObjectClass.listForms);
        deleteModels.pushObjects(deleteObjectClass.editForms);
        deleteObject = deleteObjectClass.settings;
      } else {
        deleteObject = modelHash.findBy('data.id', selectedElement.id);
      }

      modelHash.removeObject(deleteObject);

      this.get('appState').loading();
      /*deleteModels.pushObject(selectedElement);
      this.get('store').batchUpdate(deleteModels.map(a => a.data.deleteRecord()))*/
      deleteObject.data.destroyRecord() // TODO убрать при появлении batchUpdate.
      .then(() => {
        this.set('selectedElement', undefined);
        this.get('fdSheetService').closeSheet(this.get('sheetComponentName'));
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
      .finally(() => {
        this.get('appState').reset();
      });
    }
  }
});
