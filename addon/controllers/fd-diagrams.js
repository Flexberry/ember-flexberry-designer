import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { observer, computed } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { schedule } from '@ember/runloop';
import { all, resolve } from 'rsvp';
import hasChanges from '../utils/model-has-changes';

export default Controller.extend({
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
    @default undefined
  */
  selectedElement: undefined,

  /**
    The object to edit.

    @property editableObject
    @type FdDevClassModel
  */
  editableObject: undefined,

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
    Name for sheet with object edit form.

    @property objectEditFormSheet
    @type String
    @default 'objectEditFormSheet'
  */
  objectEditFormSheet: 'objectEditFormSheet',

  /**
    The part of the name for the component with the object edit form, corresponds to the stereotype.

    @property objectEditFormNamePart
    @type String
  */
  objectEditFormNamePart: undefined,

  /**
   Array items with empty reference count.

   @property emptyReferenceCountItems
   @type {Array}
   */
  emptyReferenceCountItems: A(),

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

    let newModel = {};

    for (let prop in model) {
      let newdata = model[prop].filter(filterFunction);
      newModel[prop] = A(newdata);
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
      schedule('afterRender', this, function() {
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
    if (this.get('sheetComponentName') === sheetName) {
      this.deactivateListItem();
      this.set('selectedElement', undefined);
    } else if (this.get('objectEditFormSheet') === sheetName) {
      this.set('objectEditFormNamePart', undefined);
      this.set('editableObject', undefined);
    }
  },

  /**
    Save changes in primitives.

    @method savePrimitives
  */
  savePrimitives() {
    let promises = A();
    let model = this.get('selectedElement.model');
    let primitives = model.get('primitives');
    primitives.forEach((primitive) => {
      if (!isNone(primitive.get('isCreated'))) {
        primitive.set('isCreated', false);
      }
    });

    let repositoryObjects = primitives.uniqBy('repositoryObject').filter(p => p.get('repositoryObject'));
    if (repositoryObjects.length > 0) {
      let store = this.get('store');
      promises.pushObjects(repositoryObjects.map(p => {
        let repId = p.get('repositoryObject').slice(1, -1);
        let type = p.get('primitive.$type');
        let repObject;
        let allRepObjects;

        switch (type) {
          case 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin':
            allRepObjects = store.peekAll('fd-dev-class');
            repObject = allRepObjects.findBy('id', repId);
            if (repObject) {
              if (repObject.get('isNew')) {
                let propName = p.get('name');
                if (isBlank(propName)) {
                  return repObject.rollbackAttributes();
                } else {
                  repObject.set('nameStr', propName);
                }
              }

              let props = p.getProperties('stereotype', 'attributes', 'methods');
              repObject.setProperties({
                stereotype: props.stereotype,
                attributesStr: props.attributes.join('\n'),
                methodsStr: props.methods.join('\n')
              });
            }

            break;
          case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
            allRepObjects = store.peekAll('fd-dev-inheritance');
            repObject = allRepObjects.findBy('id', repId);
            if (repObject) {
              let props = p.getProperties('description');
              repObject.setProperties({
                nameStr: props.description
              });
            }

            break;
          case 'STORMCASE.UML.cad.Composition, UMLCAD':
            allRepObjects = store.peekAll('fd-dev-aggregation');
          // eslint-disable-next-line no-fallthrough
          case 'STORMCASE.UML.cad.Association, UMLCAD':
            if (isNone(allRepObjects)) {
              allRepObjects = store.peekAll('fd-dev-association');
            }

            repObject = allRepObjects.findBy('id', repId);

            if (repObject) {
              let props = p.getProperties('startMultiplicity', 'endMultiplicity', 'endRoleTxt', 'startRoleTxt', 'description');
              repObject.setProperties({
                nameStr: props.description,
                startMultiplicity: props.startMultiplicity,
                endMultiplicity: props.endMultiplicity,
                endRoleStr: props.endRoleTxt,
                startRoleStr: props.startRoleTxt
              });
            }

            break;
        }

        return hasChanges(repObject) ? repObject.save() : resolve();
      }));
    }

    promises.pushObjects(this.get('emptyReferenceCountItems').map(item => {
      if (item.get('isNew')) {
        return item.rollbackAttributes();
      } else {
        return item.destroyRecord();
      }
    }));
    this.get('emptyReferenceCountItems').clear();

    model.set('primitivesJsonString', JSON.stringify(primitives));

    return all(promises);
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
        .then(() => {
          this.set('isDiagramVisible', false);
          schedule('afterRender', this, function() {
            this.set('isDiagramVisible', true);
          });
        })
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
    },

    /**
      Saves the editable object.

      @method actions.saveEditableObject
    */
    saveEditableObject() {
      this.get('appState').loading();
      this.get('editingObject').save().finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Opens the edit form with the passed object.

      @method actions.openObjectEditForm
      @param {FdUmlClass} object The object to edit.
    */
    openObjectEditForm(object) {
      let objectId = object.get('repositoryObject').slice(1, -1);
      let stereotype = object.getWithDefault('stereotype', '').trim().slice(1, -1);

      this.set('editableObject', this.get('store').peekRecord('fd-dev-class', objectId));
      this.set('objectEditFormNamePart', stereotype || 'implementation');

      this.get('fdSheetService').openSheet(this.get('objectEditFormSheet'));
    },
  }
});
