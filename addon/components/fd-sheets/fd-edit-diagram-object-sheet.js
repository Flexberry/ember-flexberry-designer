import FdBaseSheet from './fd-base-sheet';
import { updateObjectByStr, updateStrByObjects } from '../../utils/fd-update-str-value';
import { applyNewClassName } from '../../utils/fd-update-class-diagram';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { isBlank, isNone } from '@ember/utils';
import { resolve, reject } from 'rsvp';

import layout from '../../templates/components/fd-sheets/fd-edit-diagram-object-sheet';

export default FdBaseSheet.extend({
  layout,

  /**
   Service for managing objects diagram.

   @property fdDiagramService
   @type {Class}
   @default Ember.inject.service()
   */
  fdDiagramService: service('fd-diagram-service'),

  /**
    Stores the value of the `attributesStr` property from the `selectedValue`, before opening the edit form.

    @private
    @property _attributesStr
    @type String
  */
  _attributesStr: undefined,

  /**
    Stores the value of the `methodsStr` property from the `selectedValue`, before opening the edit form.

    @private
    @property _methodsStr
    @type String
  */
  _methodsStr: undefined,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default 'edit-diagram-object-sheet'
  */
  sheetComponentName: 'edit-diagram-object-sheet',

  /**
    Sheet view name.

    @property nestedSheetName
    @type String
    @default 'view-sheet'
  */
  nestedSheetName: 'view-sheet',

  /**
    Value selected object.

    @property selectedValue
    @type Object
  */
  selectedValue: undefined,

  /**
    Value selected object.

    @property selectedValue
    @type Object
  */
  selectedValueModel: undefined,

  /**
    The part of the name for the component with the object edit form, corresponds to the stereotype.

    @property objectEditFormNamePart
    @type String
  */
  objectEditFormNamePart: undefined,

  /**
    Opening sheet.

     @method openSheet
     @param {String} sheetName Sheet's name.
     @param {Object} currentItem Current list item.
  */
  openSheet(sheetName, currentItem) {
    let store = this.get('store');
    let objectId = currentItem.get('repositoryObject').slice(1, -1);
    let stereotype = currentItem.getWithDefault('stereotype', '').trim().slice(1, -1);
    let selectedValue = store.peekRecord('fd-dev-class', objectId);

    updateObjectByStr(selectedValue, store);
    this.set('_attributesStr', selectedValue.get('attributesStr'));
    this.set('_methodsStr', selectedValue.get('methodsStr'));

    this.set('selectedValue', selectedValue);
    this.set('objectEditFormNamePart', stereotype || 'implementation');
    this.set('selectedValueModel', currentItem);
  },

  /**
    Closing sheet.

     @method closeSheet
  */
  closeSheet() {
    let selectedValue = this.get('selectedValue');
    if (!selectedValue.get('isNew')) {
      selectedValue.rollbackAll();
    }

    selectedValue.set('attributesStr', this.get('_attributesStr'));
    selectedValue.set('methodsStr', this.get('_methodsStr'));

    this.set('objectEditFormNamePart', undefined);
    this.set('selectedValue', undefined);
    this.set('selectedValueModel', undefined);
    this.set('_attributesStr', undefined);
    this.set('_methodsStr', undefined);

    this.set('readonlyMode', true);
  },

  /**
    Check data for correctness.

    @method validateData
    @param {Object} model Class model.
  */
  validateData(model) {
    let modelName = model.get('name');
    let modelId = model.get('id');

    if (isBlank(modelName)) {
      return reject({ message: this.get('i18n').t('forms.fd-application-model.error-message.empty-class').toString() });
    }

    if ((model.get('stereotype') === '«editform»' || model.get('stereotype') === '«listform»') && isNone(model.get('formViews.firstObject.view'))) {
      return reject({ message: this.get('i18n').t('forms.fd-application-model.error-message.view-form').toString() });
    }

    // Get current classes.
    let allClasses = this.get('store').peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', this.get('currentProjectContext').getCurrentStage());
    let currentClass = A(classesCurrentStage).find((a) => {
      return a.get('name') === modelName && a.get('id') !== modelId;
    });

    if (!isNone(currentClass)) {
      return reject({ message: this.get('i18n').t('forms.fd-application-model.error-message.exist-class').toString() });
    }

    return resolve();
  },

  actions: {

    /**
      Saves the editable object.

      @method actions.save
    */
    save() {
      let selectedValue = this.get('selectedValue');
      let objectModel = this.get('selectedValueModel');
      this.get('appState').loading();
      updateStrByObjects(selectedValue);

      this.validateData(selectedValue)
      .then(() =>
        applyNewClassName(this.get('store'), this.get('currentProjectContext'), selectedValue)
      )
      .then(() => {
        objectModel.set('name', selectedValue.get('nameStr'));
        objectModel.set('attributes', selectedValue.get('attributesStr').split('\n'));
        objectModel.set('methods', selectedValue.get('methodsStr').split('\n'));

        this.get('fdDiagramService').updateJointObjectOnDiagram(objectModel.get('id'));
        selectedValue.save()
      })
      .then(() => this.saveHasManyRelationships(selectedValue))
      .catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
        this.set('_attributesStr', selectedValue.get('attributesStr'));
        this.set('_methodsStr', selectedValue.get('methodsStr'));
      });
    }
  }
});
