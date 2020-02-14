import FdBaseSheet from './fd-base-sheet';
import FdUmlElement from '../../objects/uml-primitives/fd-uml-element';
import FdUmlLink from '../../objects/uml-primitives/fd-uml-link';

import { isNone, isBlank } from '@ember/utils';
import { translationMacro as t } from 'ember-i18n';
import { all, resolve, reject } from 'rsvp';
import { schedule } from '@ember/runloop';
import { A } from '@ember/array';
import { computed, observer, set, get } from '@ember/object';

import hasChanges from '../../utils/model-has-changes';
import { getUpdatedViews } from '../../utils/fd-update-class-diagram';
import { updateObjectByStr } from '../../utils/fd-update-str-value';

import layout from '../../templates/components/fd-sheets/fd-diagram-sheet';

const getActualValue = (value, currentValue) => {
  return isBlank(value) && isBlank(currentValue) ? currentValue : value;
};

export default FdBaseSheet.extend({
  layout,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default 'diagram-sheet'
  */
  sheetComponentName: 'diagram-sheet',

  /**
    Name for sheet with object edit form.

    @property nestedSheetName
    @type String
    @default 'edit-diagram-object-sheet'
  */
  nestedSheetName: 'edit-diagram-object-sheet',

  /**
    Data.

    @property model
    @type Object
  */
  model: undefined,

  /**
    Value selected diagram.

    @property selectedValue
    @type Object
  */
  selectedValue: undefined,

  /**
   Array items with empty reference count.

   @property emptyReferenceCountItems
   @type {Array}
   */
  emptyReferenceCountItems: A(),

  /**
    Flag: indicates whether to show create editing panel.

    @property isAddMode
    @type Bool
    @default false
  */
  isAddMode: false,

  /**
    System name.

    @property systemValue
    @type string
  */
  systemValue: undefined,

  /**
    System arrays.

    @property systemsItems
    @type Object
  */
  systemsItems: undefined,

  /**
    Ember.observer, watching string `model.name` and update 'systemValue' property.

    @method _bsObserver
  */
  systemObserver: observer('selectedValue.data.name', function() {
    let model = this.get('selectedValue.data');
    if (!isNone(model)) {
      let subsystemName = model.get('subsystem.name');
      this.set('systemValue', subsystemName);
    }
  }),

  /**
    Sheet title value.

    @method computedTitle
  */
  computedTitle: computed('isAddMode', 'i18n.locale', 'selectedValue', {
    get() {
      return this.get('isAddMode') ? t('components.fd-create-diagrams.caption') : this.get('selectedValue.data.name');
    },
    set(key, value) {
      if (!this.get('isAddMode')) {
        this.set('selectedValue.data.name', value);
      }

      return value;
    }
  }),

  /**
    Opening sheet.

     @method openSheet
     @param {String} sheetName Sheet's name.
     @param {Object} currentItem Current list item.
  */
  openSheet(sheetName, currentItem) {
    this.deactivateListItem();
    this.set('selectedValue', currentItem);
    if (!isNone(currentItem)) {
      this.set('isAddMode', false);
    }

    this.set('readonlyMode', true);
    schedule('afterRender', this, function() {
      this.set('isDiagramVisible', true);
    });
  },

  /**
    Closing sheet.

     @method closeSheet
  */
  closeSheet() {
    this.deactivateListItem();
    this.set('readonlyMode', true);
    this.set('selectedValue', undefined);
  },

  /**
    Deactivate item from selectedValue.

     @method deactivateListItem
  */
  deactivateListItem() {
    let selectedValue = this.get('selectedValue');
    if (!isNone(selectedValue)) {
      let store = this.get('store');
      let model = get(selectedValue, 'data');
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
      this.get('emptyReferenceCountItems').clear();
      this.set('isDiagramVisible', false);
      set(selectedValue, 'active', false);
    }
  },

  /**
    Save changes in primitives.

    @method savePrimitives
    @param {Object} model Diagram model.
  */
  savePrimitives(model) {
    let promises = A();
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
              repObject.set('nameStr', p.get('name'));
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

              let updatedViews = A();
              removeClasses.forEach(removeClasse => {
                updatedViews.pushObjects(getUpdatedViews(store, primitives, removeClasse.get('name'), null));
              });

              promises.pushObjects(updatedViews.map(a => a.save()));
            }

            emptyReferenceCountItems.clear();

            model.set('primitivesJsonString', JSON.stringify(primitives));
            model.set('caseObjectsString', elements.map(p => `Class:(${p.get('name')})`).join(';'));
            return all(promises);
          });
        });
      });
    } else {
      model.set('primitivesJsonString', JSON.stringify(primitives));
      model.set('caseObjectsString', null);
      return resolve();
    }
  },

  /**
    Add in model new diagram.

     @method addNewDiagramInModel
  */
  addNewDiagramInModel() {
    let model = this.get('selectedValue');
    let modelPart = model.data.get('constructor.modelName').slice(11);
    this.get(`model.${modelPart}`).pushObject(model);

    this.get('updateModel')();
  },

    /**
    Finds loops in links.

     @method checkForLooping
  */
  checkForLooping() {
    let model = this.get('selectedValue.data');
    let primitivesModel = model.get('primitives');
    let mapPrimitives = primitivesModel.mapBy('primitive');

    let store = this.get('store');
    let allInheritance = store.peekAll('fd-dev-inheritance');

    let loopFunction = function(rep, childId, i18n) {
      let newReps = allInheritance.filter(function(r) {
        let isExist = true;
        if (r.get('isNew')) {
          isExist = A(mapPrimitives).findBy('RepositoryObject', `{${r.get('id')}}`) ? true : false;
        }

        return isExist && r.get('child.id') === rep.get('parent.id') && store.peekRecord('fd-dev-class', r.get('parent.id')).get('stereotype') !== '«interface»';
      });

      if (newReps.length > 1) {
        message = i18n.t('forms.fd-diagrams.error-message.two-childs').toString();
      } else if (newReps.length === 0) {
        return;
      }

      let newRep = newReps.get('firstObject');

      if (newRep.get('parent.id') === childId) {
        message = i18n.t('forms.fd-diagrams.error-message.loop-inheritance').toString();
      } else {
        loopFunction(newRep, childId, i18n);
      }
    };

    let message = '';
    mapPrimitives.forEach((primitive) => {
      if (primitive.$type !== "STORMCASE.UML.cad.Inheritance, UMLCAD" || isNone(primitive.RepositoryObject) || !isBlank(message)) {
        return;
      }

      let currentObj = allInheritance.findBy('id', primitive.RepositoryObject.slice(1, -1));
      let childId = currentObj.get('child.id');

      loopFunction(currentObj, childId, this.get('i18n'));
    });

    return message;
  },

  /**
    Check data for correctness.

    @method validateData
    @param {Object} model Diagram model.
  */
  validateData(model) {
    let emptyClass = model.get('primitives').find((p) => {
      return p.get('primitive.$type') === 'STORMCASE.STORMNET.Repository.CADClass, STORM.NET Case Tool plugin' && isBlank(p.get('name'));
    });

    if (!isNone(emptyClass)) {
      return reject({ message: this.get('i18n').t('forms.fd-diagrams.error-message.empty-class').toString() });
    }

    let modelName = model.get('name');
    if (isBlank(modelName)) {
      return reject({ message: this.get('i18n').t('forms.fd-diagrams.error-message.empty-diagram').toString() });
    }

    if (model.get('isNew')) {
      // Get current diagrams.
      let allDiagrams = this.get('store').peekAll(`${model.constructor.modelName}`);
      let diagramsCurrentStage = allDiagrams.filterBy('subsystem.stage.id', this.get('currentProjectContext').getCurrentStage());
      let currentDiagram = A(diagramsCurrentStage).find((a) => {
        return a.get('name') === modelName && !isNone(a.get('id'));
      });

      if (!isNone(currentDiagram)) {
        return reject({ message: this.get('i18n').t('forms.fd-diagrams.error-message.exist-diagram').toString() });
      }
    }

    let errorMessage = this.checkForLooping();
    if (!isBlank(errorMessage)) {
      return reject({ message: errorMessage });
    }

    return resolve();
  },

  init() {
    this._super(...arguments);

    let stage = this.get('currentProjectContext').getCurrentStageModel();
    let systems = stage.get('systems').toArray();
    let systemsNames = systems.mapBy('name');

    this.set('systemsItems', {
      names: systemsNames,
      objects: systems,
    });

    this.get('systemObserver').apply(this);
  },

  actions: {
    /**
      Save 'selectedValue'.

       @method actions.save
       @param {Boolean} closeAfter Close after save.
    */
    save(closeAfter) {
      let model = this.get('selectedValue.data');
      let isNew = model.get('isNew');
      let isNewSystem = !isNone(model.changedBelongsTo().subsystem);

      this.get('appState').loading();

      this.validateData(model)
      .then(() => this.savePrimitives(model))
      .then(() => model.save())
      .then(() => {
        if (isNew) {
          this.addNewDiagramInModel();
        } else if (isNewSystem) {
          this.get('updateModel')();
        }

        this.set('isDiagramVisible', false);
        schedule('afterRender', this, function() {
          this.set('isDiagramVisible', true);
        });
      }).then(() => {
        if (closeAfter) {
          this.get('targetObject').confirmClose(this.get('sheetComponentName'));
        }
      })
      .catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Delete selected diagram.

       @method actions.delete
    */
    delete() {
      let store = this.get('store');
      let selectedValue = this.get('selectedValue.data');
      let modelPart = selectedValue.get('constructor.modelName').slice(11);
      let modelHash = this.get(`model.${modelPart}`);

      let deleteObject = modelHash.findBy('data.id', selectedValue.id);
      modelHash.removeObject(deleteObject);

      this.get('appState').loading();

      let deleteModels = A();
      let primitives = selectedValue.get('primitives');
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

          if (repObject.get('referenceCount') > 1) {
            repObject.decrementProperty('referenceCount');
          } else {
            repObject.deleteRecord();
          }

          return repObject;
        }));
      }

      selectedValue.deleteRecord();
      deleteModels.pushObject(selectedValue);
      store.batchUpdate(deleteModels)
      .then(() => {
        this.get('updateModel')();
        this.set('selectedValue', undefined);
        this.get('fdSheetService').closeSheet(this.get('sheetComponentName'));
      })
      .catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    },

    /**
      Update 'businessServerClass'.

      @method actions.changeSystem
      @param {Object} value An object with a new value in the `value` property.
    */
    changeSystem(value) {
      if (isNone(value)) {
        return;
      }

      let model = this.get('selectedValue.data');
      let systemsItems = this.get('systemsItems');
      let systemsObject = systemsItems.objects.findBy('name', value);
      set(model, 'subsystem', systemsObject);
    }
  }
});
