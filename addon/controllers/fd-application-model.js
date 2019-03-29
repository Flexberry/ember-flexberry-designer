import Ember from 'ember';

export default Ember.Controller.extend({

  /**
    Service for managing the state of the application.

    @property appState
    @type AppStateService
  */
  appState: Ember.inject.service(),

  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: Ember.inject.service(),

  /**
    Service for get current stage.

    @property fdCurrentProjectContext
    @type FdCurrentProjectContext
  */
  fdCurrentProjectContext: Ember.inject.service(),

  /**
    Flag, that indicates when sheet must be opened as create new class panel.

    @private
    @property _isSheetCreateClassPanel
    @readOnly
    @type Boolean
  */
  _isSheetCreateClassPanel: false,

  /**
    Value selected entity.

    @property selectedElement
    @type Object
    @default undefined
  */
  selectedElement: undefined,

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
    Ember.observer, watching property `searchValue` and send action from 'fd-sheet' component.

    @method searchValueObserver
  */
  searchValueObserver: Ember.observer('searchValue', function() {
    let sheetComponentName = this.get('sheetComponentName');
    let fdSheetService = this.get('fdSheetService');
    if (fdSheetService.isVisible(sheetComponentName)) {
      fdSheetService.closeSheet(sheetComponentName);
    }
  }),

  /**
    Removes quotes from class stereotype.

    @method componentNamePart
  */
  componentNamePart: Ember.computed('selectedElement', function() {
    let selectedElement = this.get('selectedElement');
    if (!Ember.isNone(selectedElement)) {
      let stereotype = selectedElement.get('model.stereotype');
      if (Ember.isNone(stereotype)) {
        return 'implementation';
      }

      return stereotype.substring(1, stereotype.length - 1);
    }
  }),

  /**
    Update model for search

    @method filteredModel
  */
  filteredModel: Ember.computed('model', 'searchValue', function() {
    let searchStr = this.get('searchValue');
    let model = this.get('model');

    if (Ember.isBlank(searchStr)) {
      return model;
    }

    searchStr = searchStr.trim().toLocaleLowerCase();
    let filterFunction = function(item) {
      let name = item.get('name');
      if (!Ember.isNone(name) && name.toLocaleLowerCase().indexOf(searchStr) !== -1) {
        return item;
      }
    };

    let newClasses = model.classes.filter(function(clazz) {
      let classes = filterFunction(clazz.settings);
      if (!Ember.isNone(classes)) {
        return clazz;
      }

      let editForms = clazz.editForms.some(filterFunction);
      let listForms = clazz.listForms.some(filterFunction);
      let parents = clazz.parents.some(filterFunction);
      let bs = !Ember.isNone(clazz.bs) ? filterFunction(clazz.bs) : null;

      if (editForms || listForms || parents || !Ember.isNone(bs)) {
        return clazz;
      }
    });

    let newModel = {
      classes: Ember.A(newClasses)
    };

    for (let prop in model) {
      if (prop !== 'classes') {
        let newdata = model[prop].filter(filterFunction);
        newModel[prop] = Ember.A(newdata);
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
    if (!Ember.isNone(selectedElement)) {
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
      Ember.set(classObj, 'bs', modelSelectedElement.get('businessServerClass'));
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
      this.set('selectedElement', undefined);
    }

    this.set('_isSheetCreateClassPanel', false);
  },

  /**
    Save dirty hasMany relationships in the `model`.
    This method invokes by `save` method.

    @method saveHasManyRelationships
    @param {DS.Model} model Record with hasMany relationships.
    @return {Promise} A promise that will be resolved to array of saved records.
  */
  saveHasManyRelationships(model) {
    let promises = [];
    model.eachRelationship((name, desc) => {
      if (desc.kind === 'hasMany') {
        model.get(name).filterBy('hasDirtyAttributes', true).forEach((record) => {
          let promise = record.save();
          promises.push(promise);
        });
      }
    });

    return Ember.RSVP.all(promises);
  },

  actions: {
    /**
      Save 'selectedElement'.

       @method actions.save
    */
    save() {
      let model = this.get('selectedElement.model');
      this.get('appState').loading();
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
      Create new Class.

       @method actions.createNewClass
    */
    openCreateClassPanel() {
      this.set('_isSheetCreateClassPanel', true);
      this.deactivateListItem();
      this.set('selectedElement', undefined);
      let sheetComponentName = this.get('sheetComponentName');
      let fdSheetService = this.get('fdSheetService');

      fdSheetService.openSheet(sheetComponentName);
    }
  }
});
