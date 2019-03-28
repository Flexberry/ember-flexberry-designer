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
    Stores classes that was created, but not yet saved, in the diagram.

    @property createdClasses
    @type Ember.Array
  */
  createdClasses: Ember.A(),

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

    let newModel = {};

    for (let prop in model) {
      let newdata = model[prop].filter(filterFunction);
      newModel[prop] = Ember.A(newdata);
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
      this.set('isDiagramVisible', false);
      selectedElement.set('fdListItemActive', false);
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
      Ember.run.schedule('afterRender', this, function() {
        this.set('isDiagramVisible', true);
      });
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
  },

  /**
    Save changes in primitives.

    @method savePrimitives
  */
  savePrimitives() {
    let model = this.get('selectedElement.model');
    let primitives = model.get('primitives');
    let first = primitives.shift();
    primitives.push(first); //Change primitives for enebling serialize(). First Element to last
    model.set('primitivesJsonString', JSON.stringify(primitives));
    let createdClasses = this.get('createdClasses');
    let promises = createdClasses.map(c => c.save());
    createdClasses.clear();
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
      this.savePrimitives().then(() => {
        model.save()
        .catch((error) => {
          this.set('error', error);
        })
        .finally(() => {
          this.get('appState').reset();
        });
      }).catch((error) => {
        this.set('error', error);
        this.get('appState').reset();
      });
    }
  }
});
