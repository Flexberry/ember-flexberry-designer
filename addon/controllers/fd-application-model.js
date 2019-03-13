import Ember from 'ember';

export default Ember.Controller.extend({

  /**
    Service for managing the state of the application.

    @property appState
    @type AppStateService
  */
  appState: Ember.inject.service(),

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

  /**
    Deactivate item from selectedElement.

     @method deactivateListItem
  */
  deactivateListItem() {
    let selectedElement = this.get('selectedElement');
    if (!Ember.isNone(selectedElement)) {
      let model = selectedElement.get('model');
      model.rollbackAll();
      selectedElement.set('fdListItemActive', undefined);
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

  actions: {

    /**
      Opening sheet.

       @method actions.openSheet
    */
    openSheet(currentItem) {
      this.deactivateListItem();
      this.set('selectedElement', currentItem);
    },

    /**
      Closing sheet.

       @method actions.closeSheet
    */
    closeSheet() {
      this.deactivateListItem();
      this.set('selectedElement', undefined);
    },

    /**
      Save 'selectedElement'.

       @method actions.save
    */
    save() {
      let model = this.get('selectedElement.model');
      this.get('appState').loading();
      model.save()
      .catch((error) => {
        this.set('error', error);
      })
      .finally(() => {
        this.get('appState').reset();
      });
      this.updateClassModel(model);
    }
  }
});
