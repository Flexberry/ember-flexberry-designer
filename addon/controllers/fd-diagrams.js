import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { observer, computed } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { schedule } from '@ember/runloop';
import { all, resolve } from 'rsvp';
import hasChanges from '../utils/model-has-changes';

import FdUmlElement from '../objects/uml-primitives/fd-uml-element';
import FdUmlLink from '../objects/uml-primitives/fd-uml-link';

const getActualValue = (value, currentValue) => {
  return isBlank(value) && isBlank(currentValue) ? currentValue : value;
};

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
      let elements = repositoryObjects.filter(p => p instanceof FdUmlElement);
      if (elements.length > 0) {
        promises.pushObjects(elements.map(p => {
          let repId = p.get('repositoryObject').slice(1, -1);
          let allRepObjects = store.peekAll('fd-dev-class');
          let repObject = allRepObjects.findBy('id', repId);
          if (repObject) {
            if (repObject.get('isNew')) {
              let propName = p.get('name');
              if (isBlank(propName)) {
                return repObject.rollbackAttributes();
              } else {
                repObject.set('nameStr', propName);
              }
            }

            let stereotype = p.getWithDefault('stereotype', '').trim();
            let attributes = p.getWithDefault('attributes', []).join('\n').trim();
            let methods = p.getWithDefault('methods', []).join('\n').trim();
            let currentValues = repObject.getProperties('stereotype', 'attributesStr', 'methodsStr');
            repObject.setProperties({
              stereotype: getActualValue(stereotype, currentValues.stereotype),
              attributesStr: getActualValue(attributes, currentValues.attributesStr),
              methodsStr: getActualValue(methods, currentValues.methodsStr),
            });
          }

          return hasChanges(repObject) ? repObject.save() : resolve();
        }));
      }

      return all(promises).then(() => {
        promises.clear();

        let links = repositoryObjects.filter(p => p instanceof FdUmlLink);
        if (links.length > 0) {
          promises.pushObjects(links.map(p => {
            let repId = p.get('repositoryObject').slice(1, -1);
            let type = p.get('primitive.$type');
            let repObject;
            let allRepObjects;

            switch (type) {
              case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
                allRepObjects = store.peekAll('fd-dev-inheritance');
                repObject = allRepObjects.findBy('id', repId);
                if (repObject) {
                  let description = p.getWithDefault('description', '').trim();
                  repObject.set('nameStr', getActualValue(description, repObject.get('nameStr')));
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
                  let startMultiplicity = p.getWithDefault('startMultiplicity', '').trim();
                  let endMultiplicity = p.getWithDefault('endMultiplicity', '').trim();
                  let endRoleTxt = p.getWithDefault('endRoleTxt', '').trim();
                  let startRoleTxt = p.getWithDefault('startRoleTxt', '').trim();
                  let description = p.getWithDefault('description', '').trim();
                  let currentValues = repObject.getProperties('nameStr', 'startMultiplicity', 'endMultiplicity', 'endRoleStr', 'startRoleStr');
                  repObject.setProperties({
                    nameStr: getActualValue(description, currentValues.nameStr),
                    startMultiplicity: getActualValue(startMultiplicity, currentValues.startMultiplicity),
                    endMultiplicity: getActualValue(endMultiplicity, currentValues.endMultiplicity),
                    endRoleStr: getActualValue(endRoleTxt, currentValues.endRoleStr),
                    startRoleStr: getActualValue(startRoleTxt, currentValues.startRoleStr),
                  });
                }

                break;
            }

            return hasChanges(repObject) ? repObject.save() : resolve();
          }));
        }

        return all(promises).then(() => {
          promises.clear();

          let emptyReferenceCountItems = this.get('emptyReferenceCountItems');
          let removeClass = emptyReferenceCountItems.filterBy('constructor.modelName', 'fd-dev-class');
          emptyReferenceCountItems.removeObjects(removeClass);

          let mapFunction = function(item) {
            if (item.get('isNew')) {
              return item.rollbackAttributes();
            } else {
              return item.destroyRecord();
            }
          };

          if (emptyReferenceCountItems.length > 0) {
            promises.pushObjects(emptyReferenceCountItems.map(mapFunction));
          }

          return all(promises).then(() => {
            promises.clear();

            if (removeClass.length > 0) {
              promises.pushObjects(removeClass.map(mapFunction));
            }

            emptyReferenceCountItems.clear();

            model.set('primitivesJsonString', JSON.stringify(primitives));
            return all(promises);
          });
        });
      });
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
    }
  }
});
