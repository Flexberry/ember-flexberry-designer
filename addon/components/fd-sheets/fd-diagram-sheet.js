import FdBaseSheet from './fd-base-sheet';
import FdUmlElement from '../../objects/uml-primitives/fd-uml-element';
import FdUmlLink from '../../objects/uml-primitives/fd-uml-link';

import { isNone, isBlank } from '@ember/utils';
import { translationMacro as t } from 'ember-i18n';
import { resolve, reject } from 'rsvp';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { A } from '@ember/array';
import { computed, observer, set, get } from '@ember/object';
import uuid from 'npm:node-uuid';

import hasChanges from '../../utils/model-has-changes';
import { getUpdatedViews } from '../../utils/fd-update-class-diagram';
import { updateObjectByStr } from '../../utils/fd-update-str-value';
import FdPrimitivesArraySortingMixin from '../../mixins/fd-primitives-array-sorting';

import layout from '../../templates/components/fd-sheets/fd-diagram-sheet';

const getActualValue = (value, currentValue) => {
  return isBlank(value) && isBlank(currentValue) ? currentValue : value;
};

export default FdBaseSheet.extend(
  FdPrimitivesArraySortingMixin, {
  layout,

  /**
   Service for managing locks.

   @property fdLockService
   @type {Class}
   @default service()
   */
  fdLockService: service(),

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
   Array items with empty and decremented reference count.

   @property decrementedReferenceCountItems
   @type {Array}
   */
   decrementedReferenceCountItems: A(),

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
    Flag: indicates when additional settings displayed.

    @property showSettins
    @type boolean
    @default false
  */
  showSettins: false,

  /**
    Flags indicates any changes on diagram.

    @property isDiagramChanged
    @type Boolean
  */
  isDiagramChanged: false,

  /**
    Flag: indicates whether to not show gen button.

    @property GenToolbarVisible
    @type Bool
  */
  genToolbarVisible: false,

  /**
    Ember.observer, watching string `model.isNew` and `readonlyMode` and update 'showSettins' property.

    @method _bsObserver
  */
  showSettinsObserver: observer('readonlyMode', 'selectedValue.data.isNew', function(){
    this.set('showSettins', !this.get('readonlyMode') && !this.get('selectedValue.data.isNew') && this.get('showSettins'));
  }),

  /**
    Ember.observer, watching model changes.

    @method modelChangesObserver
  */
  modelChangesObserver: observer('selectedValue.data.hasDirtyAttributes', function() {
    if (this.get('selectedValue.data.hasDirtyAttributes')) {
      this.set('isDiagramChanged', true);
    }
  }),

  /**
    Custom buttons for `fd-sheets-tool-bar` on `fd-diagram-sheet` route.

    @property customButtons
    @type Array
  */
  customButtons: computed('i18n.locale', 'selectedValue.data.isNew', 'isAddMode', 'readonlyMode', function() {
    const i18n = this.get('i18n');
    const diagramType = this.get('diagramType');
    return [
      {
        buttonTitle: i18n.t('components.fd-diagram-editing-panel.uml-validator-title'),
        buttonVisible: diagramType === 'cad' && !this.get('selectedValue.data.isNew') && !this.get('isAddMode') && this.get('readonlyMode'),
        iconClasses: 'icon-fd-uml-valid icon',
        buttonAction: this.get('umlValidator').bind(this)
      },
      {
        buttonTitle: i18n.t('components.fd-diagram-editing-panel.uml-corrector-title'),
        buttonVisible: diagramType === 'cad' && !this.get('selectedValue.data.isNew') && !this.get('isAddMode') && this.get('readonlyMode'),
        iconClasses: ' icon-fd-uml-edit icon',
        buttonAction: this.get('umlСorrector').bind(this)
      },
      {
        buttonTitle: i18n.t('components.fd-diagram-editing-panel.toggler-caption'),
        buttonVisible: this.get('selectedValue.data.isNew') || (!this.get('isAddMode') && !this.get('readonlyMode')),
        iconClasses: 'icon-guideline-setting icon',
        buttonAction: () => this.toggleProperty('showSettins'),
      }];
  }),

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
    Type diagram.

    @method diagramType
  */
  diagramType: computed('selectedValue.data.constructor.modelName', function() {
    let type = this.get('selectedValue.data.constructor.modelName');
    if (isNone(type)) {
      return undefined;
    }

    return type.split('-').pop();
  }),

  /**
    Url video help.

    @method urlVideoHelp
  */
  urlVideoHelp: computed('diagramType', function() {
    let diagramType = this.get('diagramType');
    if (isNone(diagramType)) {
      return;
    }

    let componentName = `fd-uml-diagram-toolbars/fd-${diagramType}-toolbar`;
    let url = this.getHelpUrl(componentName);

    return url;
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
    this.set('_collapseToolbar', false);
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
    Check uml on validate.

     @method umlValidator
  */
  umlValidator() {
    let selectedDiagramId = this.get('selectedValue.data.id');

    const store = this.get('store');
    const adapter = store.adapterFor('application');
    const data = { diagramId: selectedDiagramId };

    this.get('appState').loading();
    adapter.callFunction('ValidateUmlDiagram', data, null, { withCredentials: true }).then((result) => {
      const i18n = this.get('i18n');
      let message = i18n.t('forms.fd-diagrams.custom-message.no-errors').toString();
      if (!isBlank(result.value)) {
        message = result.value;
      }

      this.get('fdDialogService').showCustomMessage(message, i18n.t('forms.fd-diagrams.custom-message.validate-header').toString());
    }).catch((error) => {
      this.get('fdDialogService').showErrorMessage(error.message);
    }).finally(() => {
      this.get('appState').reset();
    });
  },

  /**
    Update uml errors.

     @method umlСorrector
  */
  umlСorrector() {
    const fdLockService = this.get('fdLockService');
    const context = this.get('currentProjectContext');
    let selectedDiagram = this.get('selectedValue.data');
    let sheetComponentName = this.get('sheetComponentName');

    this.get('appState').loading();
    fdLockService.checkLock(selectedDiagram, sheetComponentName).then(result => {
      return result && !result.Acquired ? resolve() : reject({ message: this.get('i18n').t('components.fd-sheets-tool-bar.object-locked').toString() + (result ? result.UseName : '') });
    })
    .then(() => {
      const store = this.get('store');
      const adapter = store.adapterFor('application');
      const data = { diagramId: selectedDiagram.get('id') };

      return adapter.callFunction('CorrectUmlDiagram', data, null, { withCredentials: true });
    })
    .then((result) => {
      if (!isBlank(result.value)) {
        this.get('appState').reset();
        const i18n = this.get('i18n');
        let pageContext = this.get('targetObject');
        let message = i18n.t('forms.fd-diagrams.custom-message.corrector-message').toString() + `\n ${result.value}`;

        this.get('fdDialogService').showCustomMessage(
          message,
          i18n.t('forms.fd-diagrams.custom-message.corrector-header').toString(),
          false
        );

        let transitionFunction = function() {
          pageContext.removeObserver('show', this, transitionFunction);
          let stageId = context.getCurrentStage();
          context.resetCurrentStage();
          pageContext.transitionToRoute('fd-diagrams', { queryParams: { gotostage: stageId, gototype: 'fd-dev-uml-cad', gotoobj: selectedDiagram.get('id') } });
        };

        pageContext.addObserver('show', this, transitionFunction);
      }
    }).catch((error) => {
      this.get('fdDialogService').showErrorMessage(error.message);
    }).finally(() => {
      this.get('appState').reset();
    });
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
          case 'STORMCASE.STORMNET.Repository.CADClass, STORM.NETCaseToolPlugin':
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
          case 'STORMCASE.UML.cad.Realization, UMLCAD':
            modelName = 'fd-dev-realization';
            break;
          case 'STORMCASE.UML.cad.LinkInheritance, UMLCAD':
          case 'STORMCASE.UML.cad.TemplateClass, UMLCAD':
            break;
          default:
            throw new Error(`Unsupported type: '${primitive.get('primitive.$type')}'.`);
        }

        let record = store.peekRecord(modelName, id);
        if (!isNone(record)) {
          if (record.get('isNew')) {
            record.unloadRecord();
          } else {
            record.rollbackAll();
          }
        }
      });

      model.rollbackAll();
      this.get('decrementedReferenceCountItems').clear();
      set(selectedValue, 'active', false);
    }

    this.set('isDiagramVisible', false);
  },

  /**
    Save changes in primitives.

    @method savePrimitives
    @param {Object} model Diagram model.
  */
  savePrimitives(model) {
    let updateModels = A();
    let primitives = model.get('primitives');
    let store = this.get('store');

    // Sort elements. Partition primitive to first.
    primitives = this.sortingByTypePartition(primitives);

    primitives.forEach((primitive) => {
      if (!isNone(primitive.get('isCreated'))) {
        primitive.set('isCreated', false);
      }
    });

    let decrementedReferenceCountItems = this.get('decrementedReferenceCountItems');

    const filteredItems = decrementedReferenceCountItems.filter(obj => {
      if (obj.referenceCount > 0) {
        updateModels.pushObject(obj);
        return false; // Don't add object to new filtered array
      }
      return true; // Add object to new filtered array
    });

    decrementedReferenceCountItems = A(filteredItems);

    let repositoryObjects = primitives.uniqBy('repositoryObject').filter(p => p.get('repositoryObject'));
    if (repositoryObjects.length > 0) {
      let elements = repositoryObjects.filter(p => p instanceof FdUmlElement);
      if (elements.length > 0) {
        elements.forEach((p) => {
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

          if (hasChanges(repObject)) {
            updateModels.pushObject(repObject);

            let hasManyModels = this.getHasManyRelationships(repObject);
            updateModels.pushObjects(hasManyModels);
          }
        });
      }

      let links = repositoryObjects.filter(p => p instanceof FdUmlLink);
      if (links.length > 0) {
        links.forEach((p) => {
          let repId = p.get('repositoryObject').slice(1, -1);
          let type = p.get('primitive.$type');
          let repObject;
          let allRepObjects;

          switch (type) {
            case 'STORMCASE.UML.cad.Realization, UMLCAD':
              allRepObjects = store.peekAll('fd-dev-realization');
            // eslint-disable-next-line no-fallthrough
            case 'STORMCASE.UML.cad.Inheritance, UMLCAD':
              if (isNone(allRepObjects)) {
                allRepObjects = store.peekAll('fd-dev-inheritance');
              }

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
                let storage = startRoleTxt;

                if (isBlank(storage)) {
                  storage = repObject.get('startClass.name');
                } else {
                  let accessModifier = storage[0];
                  let condition = accessModifier === '+' || accessModifier === '-' || accessModifier === '#';

                  storage = condition ? storage.substring(1, storage.length) : storage;
                }

                let currentValues = repObject.getProperties('nameStr', 'startMultiplicity', 'endMultiplicity', 'endRoleStr', 'startRoleStr', 'storage');
                repObject.setProperties({
                  nameStr: getActualValue(description, currentValues.nameStr),
                  startMultiplicity: getActualValue(startMultiplicity, currentValues.startMultiplicity),
                  endMultiplicity: getActualValue(endMultiplicity, currentValues.endMultiplicity),
                  endRoleStr: getActualValue(endRoleTxt, currentValues.endRoleStr),
                  startRoleStr: getActualValue(startRoleTxt, currentValues.startRoleStr),
                  storage: storage
                });
              }

              break;
          }

          if (hasChanges(repObject)) {
            updateModels.pushObject(repObject);
          }
        });
      }

      model.set('primitivesJsonString', JSON.stringify(primitives));
      model.set('caseObjectsString', elements.map(p => `Class:(${p.get('name')})`).join(';'));
    } else {
      model.set('primitivesJsonString', JSON.stringify(primitives));
      model.set('caseObjectsString', null);
    }

    let removeClasses = decrementedReferenceCountItems.filterBy('constructor.modelName', 'fd-dev-class');
    decrementedReferenceCountItems.removeObjects(removeClasses);

    let mapFunction = function(item) {
      if (item.get('isNew')) {
        item.rollbackAttributes();
      } else {
        item.deleteRecord();
        updateModels.pushObject(item);
      }
    };

    if (decrementedReferenceCountItems.length > 0) {
      decrementedReferenceCountItems.forEach(mapFunction);
    }

    if (removeClasses.length > 0) {
      removeClasses.forEach(mapFunction);
      removeClasses.forEach(removeClasse => {
        updateModels.pushObjects(getUpdatedViews(store, primitives, removeClasse.get('name'), null));
      });
    }

    decrementedReferenceCountItems.clear();
    this.set('decrementedReferenceCountItems', decrementedReferenceCountItems);

    updateModels.pushObject(model);

    return updateModels;
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
      return p.get('primitive.$type') === 'STORMCASE.STORMNET.Repository.CADClass, STORM.NETCaseToolPlugin' && isBlank(p.get('name'));
    });

    if (!isNone(emptyClass)) {
      return reject({ message: this.get('i18n').t('forms.fd-diagrams.error-message.empty-class').toString() });
    }

    let modelName = model.get('name');
    if (isBlank(modelName)) {
      return reject({ message: this.get('i18n').t('forms.fd-diagrams.error-message.empty-diagram').toString() });
    }

    let emptyMultiplicity = model.get('primitives').find((p) => {
      return p.get('primitive.$type') === 'STORMCASE.UML.cad.Association, UMLCAD' && isBlank(p.get('startMultiplicity'));
    });

    if (!isNone(emptyMultiplicity)) {
      return reject({ message: this.get('i18n').t('forms.fd-diagrams.error-message.empty-multiplicity').toString() });
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

  /**
    Flag indicates when toolbar is collapsed.

    @property _collapseToolbar
    @type Boolean
    @default false
    @private
  */
  _collapseToolbar: false,

  actions: {
    /**
      Handler for click on toolbar collapse button.

      @method actions.collapseToolbar
    */
    collapseToolbar() {
      this.toggleProperty('_collapseToolbar');
      if (this.get('showSettins')) {
        this.set('showSettins', false)
      }
    },

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
      .then(() => {
        let updateModels = this.savePrimitives(model);
        updateModels.forEach((updateModel) => {
          if (updateModel.get('isNew') && isNone(updateModel.get('id'))) {
            updateModel.set('id', uuid.v4());
          }
        });

        if (updateModels.length === 1) {
          return updateModels[0].save();
        }

        return this.get('store').batchUpdate(updateModels, {
          'fd-dev-uml-cad': 'FdPreloadMetadata',
          'fd-dev-class': 'FdPreloadMetadata',
          'fd-dev-aggregation': 'FdPreloadMetadata',
          'fd-dev-association': 'FdPreloadMetadata',
          'fd-dev-inheritance': 'FdPreloadMetadata',
          'fd-dev-realization': 'FdPreloadMetadata',
          'fd-dev-attribute': 'FdPreloadMetadata',
          'fd-dev-method': 'FdPreloadMetadata'
        });
      })
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
        this.get('fdSheetService').successSaveModel(this.get('sheetComponentName'));
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
      @param {Boolean} confirmation
    */
    delete(confirmation) {
      if (isNone(confirmation)) {
        const i18n = this.get('i18n');
        this.get('fdDialogService').showVerificationMessage(
          i18n.t('components.fd-diagram-editing-panel.delete-confirm-message', { diagramName: this.get('selectedValue.data.name') }),
          this.get('actions.delete'), this);
        return;
      }

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
            case 'STORMCASE.UML.cad.Realization, UMLCAD':
              allRepObjects = store.peekAll('fd-dev-realization');
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
    },

    /**
      Update 'isDiagramChanged'.

      @method actions.changeDiagramPrimitives
      @param {Bool} value
    */
    changeDiagramPrimitives(value) {
      schedule('afterRender', this, function() {
        this.set('isDiagramChanged', value);
      });
    }
  }
});
