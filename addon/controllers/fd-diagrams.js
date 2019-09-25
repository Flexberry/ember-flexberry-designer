import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import EmberObject, { computed, observer } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { schedule } from '@ember/runloop';
import { all, resolve } from 'rsvp';
import { translationMacro as t } from 'ember-i18n';
import hasChanges from '../utils/model-has-changes';

import FdUmlElement from '../objects/uml-primitives/fd-uml-element';
import FdUmlLink from '../objects/uml-primitives/fd-uml-link';

import FdSaveHasManyRelationshipsMixin from '../mixins/fd-save-has-many-relationships';
import { updateObjectByStr, updateStrByObjects } from '../utils/fd-update-str-value';

const getActualValue = (value, currentValue) => {
  return isBlank(value) && isBlank(currentValue) ? currentValue : value;
};

export default Controller.extend(FdSaveHasManyRelationshipsMixin, {
  /**
    Stores the value of the `attributesStr` property from the `editableObject`, before opening the edit form.

    @private
    @property _attributesStr
    @type String
  */
  _attributesStr: undefined,

  /**
    Stores the value of the `methodsStr` property from the `editableObject`, before opening the edit form.

    @private
    @property _methodsStr
    @type String
  */
  _methodsStr: undefined,

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
   Service for managing objects diagram.

   @property fdDiagramService
   @type {Class}
   @default Ember.inject.service()
   */
  fdDiagramService: service('fd-diagram-service'),

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
    The uml object to edit.

    @property editableObjectModel
    @type FdUmlClass
  */
  editableObjectModel: undefined,

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
    Flag: indicates whether to show modal dialog.

    @private
    @property _showErrorDialog
    @type Boolean
    @default false
  */
  _showErrorDialog: false,

  /**
    Class errors text.

    @private
    @property _classErrors
    @type String
  */
  _classErrors: undefined,

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
  }),

  /**
    Sheet title value.

    @method computedTitle
  */
  computedTitle: computed('isAddMode', 'i18n.locale', 'selectedElement', {
    get() {
      return this.get('isAddMode') ? t('components.fd-create-diagrams.caption') : this.get('selectedElement.model.data.name');
    },
    set(key, value) {
      if (!this.get('isAddMode')) {
        this.set('selectedElement.model.data.name', value);
      }

      return value;
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
      let store = this.get('store');
      let model = selectedElement.get('model.data');
      let primitives = A(model.get('primitives').filterBy('repositoryObject'));

      // Recompute `primitives` property.
      model.notifyPropertyChange('primitivesJsonString');

      primitives.pushObjects(model.get('primitives').filterBy('repositoryObject'));
      primitives.uniqBy('repositoryObject').forEach((primitive) => {
        let id = primitive.get('repositoryObject').slice(1, -1);
        let modelName;
        switch (primitive.get('primitive.$type')) {
          case 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin':
            modelName = 'fd-dev-class';
            break;
          case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
            modelName = 'fd-dev-inheritance';
            break;
          case 'STORMCASE.UML.cad.Composition, UMLCAD':
            modelName = 'fd-dev-aggregation';
            break;
          case 'STORMCASE.UML.cad.Association, UMLCAD':
            modelName = 'fd-dev-association';
            break;
          case 'STORMCASE.UML.cad.LinkInheritance, UMLCAD':
            break;
          default:
            throw new Error(`Unsupported type: '${primitive.get('primitive.$type')}'.`);
        }

        store.peekRecord(modelName, id).rollbackAll();
      });

      model.rollbackAll();
      this.set('isDiagramVisible', false);
      selectedElement.set('model.active', false);
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
      if (!isNone(currentItem)) {
        this.set('isAddMode', false);
      }

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
      let editableObject = this.get('editableObject');
      if (!editableObject.get('isNew')) {
        editableObject.rollbackAll();
      }

      editableObject.set('attributesStr', this.get('_attributesStr'));
      editableObject.set('methodsStr', this.get('_methodsStr'));

      this.set('objectEditFormNamePart', undefined);
      this.set('editableObject', undefined);
      this.set('editableObjectModel', undefined);
      this.set('_attributesStr', undefined);
      this.set('_methodsStr', undefined);
    }
  },

  /**
    Save changes in primitives.

    @method savePrimitives
  */
  savePrimitives() {
    let promises = A();
    let model = this.get('selectedElement.model.data');
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

            updateObjectByStr(repObject, store);
          }

          return hasChanges(repObject) ? repObject.save().then(() => this.saveHasManyRelationships(repObject)) : resolve();
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
          let removeClasses = emptyReferenceCountItems.filterBy('constructor.modelName', 'fd-dev-class');
          emptyReferenceCountItems.removeObjects(removeClasses);

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

            if (removeClasses.length > 0) {
              promises.pushObjects(removeClasses.map(mapFunction));
            }

            emptyReferenceCountItems.clear();

            model.set('primitivesJsonString', JSON.stringify(primitives));
            return all(promises);
          });
        });
      });
    } else {
      model.set('primitivesJsonString', JSON.stringify(primitives));
      return resolve();
    }
  },

  /**
    Add in model new diagram.

     @method addNewDiagramInModel
  */
  addNewDiagramInModel() {
    let model = this.get('selectedElement.model');
    let modelPart = model.data.get('constructor.modelName').slice(11);
    this.get(`model.${modelPart}`).pushObject(model);

    this.notifyPropertyChange('model');
  },

    /**
    Finds loops in links.

     @method checkForLooping
  */
  checkForLooping() {
    let model = this.get('selectedElement.model.data');
    let primitivesModel = model.get('primitives');

    let store = this.get('store');
    let recordsInheritance = store.peekAll('fd-dev-inheritance');

    let mapPrimitives = primitivesModel.mapBy('primitive');

    mapPrimitives.forEach((primitive, index) => {
      if (mapPrimitives[index].$type === "STORMCASE.UML.cad.Inheritance, UMLCAD") {
        let idInheritance =  mapPrimitives[index].RepositoryObject;
        idInheritance = idInheritance.split('{');
        idInheritance = idInheritance[1].split('}');
        idInheritance = idInheritance[0];

        let inheritanceData = recordsInheritance.filterBy('id', idInheritance);
        let searchIndex = recordsInheritance._objects.indexOf(inheritanceData[0]);

        let currentObj = recordsInheritance._objects[searchIndex];
        let parent = currentObj.parent;

        let loopFunction = function(i) {
          if ((i>=recordsInheritance.length)||(i<0)) {
            return;
          }
          if (recordsInheritance._objects[i].parent.id === currentObj.child.id) {
            currentObj = recordsInheritance._objects[i];
            if (recordsInheritance._objects[i].child.id === parent.id) {
              throw new Error("Loop is found");
            } else {
              loopFunction(--i);
            }
          } else {
            loopFunction(++i);
          }
        }
      loopFunction(0);
      }
    });
  },

  actions: {
    /**
      Save 'selectedElement'.

       @method actions.save
    */
    save() {
      let model = this.get('selectedElement.model.data');
      this.get('appState').loading();

      
      this.checkForLooping();

      let isNew = false;
      if (model.get('isNew')) {
        isNew = true;
      }

      this.savePrimitives().then(() => {
        model.save()
        .then(() => {
          if (isNew) {
            this.addNewDiagramInModel();
          }

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
      let editableObject = this.get('editableObject');
      let objectModel = this.get('editableObjectModel');
      this.get('appState').loading();

      updateStrByObjects(editableObject);
      objectModel.set('attributes', editableObject.get('attributesStr').split('\n'));
      objectModel.set('methods', editableObject.get('methodsStr').split('\n'));
      this.get('fdDiagramService').updateJointObjectOnDiagram(objectModel.get('id'));
      editableObject.save()
      .then(() => this.saveHasManyRelationships(editableObject))
      .finally(() => {
        this.get('appState').reset();
        this.set('_attributesStr', editableObject.get('attributesStr'));
        this.set('_methodsStr', editableObject.get('methodsStr'));
      });
    },

    /**
      Opens the edit form with the passed object.

      @method actions.openObjectEditForm
      @param {FdUmlClass} object The object to edit.
    */
    openObjectEditForm(object) {
      let store = this.get('store');
      let objectId = object.get('repositoryObject').slice(1, -1);
      let stereotype = object.getWithDefault('stereotype', '').trim().slice(1, -1);
      let editableObject = store.peekRecord('fd-dev-class', objectId);

      let objectsIsUpdate = updateObjectByStr(editableObject, store);
      if (isBlank(objectsIsUpdate)) {
        this.set('_attributesStr', editableObject.get('attributesStr'));
        this.set('_methodsStr', editableObject.get('methodsStr'));

        this.set('editableObject', editableObject);
        this.set('objectEditFormNamePart', stereotype || 'implementation');
        this.set('editableObjectModel', object);

        this.get('fdSheetService').openSheet(this.get('objectEditFormSheet'));
      } else {
        this.set('_classErrors', objectsIsUpdate);
        this.set('_showErrorDialog', true);
      }
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
      Create new diagram.

       @method actions.createDiagram
       @param {String} modelNamePart part modelName
    */
    createDiagram(modelNamePart) {
      this.deactivateListItem();
      this.set('selectedElement', undefined);
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
      Delete selected diagram.

       @method actions.delete
    */
    delete() {
      /*let store = this.get('store');
      let selectedElement = this.get('selectedElement.model.data');
      let modelPart = selectedElement.get('constructor.modelName').slice(11);
      let modelHash = this.get(`model.${modelPart}`);

      let deleteObject = modelHash.findBy('data.id', selectedElement.id);
      modelHash.removeObject(deleteObject);

      this.get('appState').loading();

      let deleteModels = A();
      let primitives = selectedElement.get('primitives');
      let repositoryObjects = primitives.uniqBy('repositoryObject').filter(p => p.get('repositoryObject'));
      if (repositoryObjects.length > 0) {
        deleteModels.pushObjects(repositoryObjects.map(p => {
          let repId = p.get('repositoryObject').slice(1, -1);
          let type = p.get('primitive.$type');

          let allRepObjects;
          switch (type) {
            case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
              allRepObjects = store.peekAll('fd-dev-inheritance');
              break;
            case 'STORMCASE.UML.cad.Composition, UMLCAD':
              allRepObjects = store.peekAll('fd-dev-aggregation');
              break;
            case 'STORMCASE.UML.cad.Association, UMLCAD':
              allRepObjects = store.peekAll('fd-dev-association');
              break;
            default:
              allRepObjects = store.peekAll('fd-dev-class');
          }

          let repObject = allRepObjects.findBy('id', repId);

          return repObject.get('referenceCount') > 1 ? repObject.decrementProperty('referenceCount') : repObject.deleteRecord();
        }));
      }

      deleteModels.pushObject(selectedElement.deleteRecord());
      store.batchUpdate(deleteModels)

      all(deleteModels.map(a => a.save())).then(() => deleteObject.data.destroyRecord())
      deleteObject.data.destroyRecord()
      .then(() => {
        this.set('selectedElement', undefined);
        this.get('fdSheetService').closeSheet(this.get('sheetComponentName'));
      })
      .finally(() => {
        this.get('appState').reset();
      });*/
    }
  }
});
