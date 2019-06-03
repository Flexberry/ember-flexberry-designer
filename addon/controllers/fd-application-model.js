import Controller from '@ember/controller';
import { computed, observer, set } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { updateStrByObjects } from '../utils/fd-update-str-value';

import FdSaveHasManyRelationshipsMixin from '../mixins/fd-save-has-many-relationships';

export default Controller.extend(FdSaveHasManyRelationshipsMixin, {

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
    Removes quotes from class stereotype.

    @method componentNamePart
  */
  componentNamePart: computed('selectedElement', function() {
    let selectedElement = this.get('selectedElement');
    if (!isNone(selectedElement)) {
      let stereotype = selectedElement.get('model.stereotype');
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
      let name = item.get('name');
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
      let model = selectedElement.get('model');
      model.rollbackAll();
      selectedElement.set('fdListItemActive', false);
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
      let classObj = model.classes.findBy('settings.id', modelSelectedElement.id);
      set(classObj, 'bs', modelSelectedElement.get('businessServerClass'));
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

  actions: {

    /**
      Save 'selectedElement'.

       @method actions.save
    */
    save() {
      let model = this.get('selectedElement.model');
      this.get('appState').loading();
      updateStrByObjects(model, this.get('i18n'));
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
    }
  }
});
