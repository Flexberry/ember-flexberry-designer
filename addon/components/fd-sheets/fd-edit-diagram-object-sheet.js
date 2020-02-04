import FdBaseSheet from './fd-base-sheet';
import { updateObjectByStr, updateStrByObjects, updateLinkByStr, updateStrByLink } from '../../utils/fd-update-str-value';
import { applyNewClassName } from '../../utils/fd-update-class-diagram';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { isBlank, isNone } from '@ember/utils';
import { resolve, reject } from 'rsvp';
import { translationMacro as t } from 'ember-i18n';
import { computed } from '@ember/object';

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
    Stores the value of the `endRoleStr` property from the `selectedValue`, before opening the edit form.

    @private
    @property _endRoleStr
    @type String
  */
  _endRoleStr: undefined,

  /**
    Stores the value of the `startRoleStr` property from the `selectedValue`, before opening the edit form.

    @private
    @property _startRoleStr
    @type String
  */
  _startRoleStr: undefined,

  /**
    Stores the value of the `endMultiplicity` property from the `selectedValue`, before opening the edit form.

    @private
    @property _endMultiplicity
    @type String
  */
  _endMultiplicity: undefined,

  /**
    Stores the value of the `startMultiplicity` property from the `selectedValue`, before opening the edit form.

    @private
    @property _startMultiplicity
    @type String
  */
  _startMultiplicity: undefined,

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
    Flag: indicates whether to show link editing panel.

    @property isLink
    @type Bool
    @default false
  */
  isLink: false,

  /**
    Sheet title value.

    @method computedTitle
  */
  computedTitle: computed('isLink', 'i18n.locale', 'selectedValueModel', {
    get() {
      return this.get('isLink') ? t(`components.fd-sheets-tool-bar.link-caption`) : this.get('selectedValue.name');
    },
    set(key, value) {
      if (!this.get('isLink')) {
        this.set('selectedValue.name', value);
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
    let store = this.get('store');
    let objectId = currentItem.get('repositoryObject').slice(1, -1);

    let selectedValue, stereotype;
    let modelName = 'fd-dev-association';
    let isLink = false;

    switch (currentItem.get('primitive.$type')) {
      case 'STORMCASE.UML.cad.Composition, UMLCAD':
        modelName = 'fd-dev-aggregation';
      // eslint-disable-next-line no-fallthrough
      case 'STORMCASE.UML.cad.Association, UMLCAD':
        isLink = true;
        stereotype = currentItem.get('primitive.$type').slice(18, -8).toLocaleLowerCase();
        selectedValue = store.peekRecord(`${modelName}`, objectId);

        updateLinkByStr(selectedValue);
        this.set('_endRoleStr', selectedValue.get('endRoleStr'));
        this.set('_startRoleStr', selectedValue.get('startRoleStr'));
        this.set('_endMultiplicity', selectedValue.get('endMultiplicity'));
        this.set('_startMultiplicity', selectedValue.get('startMultiplicity'));
        break;
      default:
        stereotype = currentItem.getWithDefault('stereotype', '').trim().slice(1, -1) || 'implementation';
        selectedValue = store.peekRecord('fd-dev-class', objectId);

        updateObjectByStr(selectedValue, store);
        this.set('_attributesStr', selectedValue.get('attributesStr'));
        this.set('_methodsStr', selectedValue.get('methodsStr'));
    }

    this.set('isLink', isLink);
    this.set('selectedValue', selectedValue);
    this.set('objectEditFormNamePart', stereotype);
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

    if (this.get('isLink')) {
      selectedValue.set('endRoleStr', this.get('_endRoleStr'));
      selectedValue.set('startRoleStr', this.get('_startRoleStr'));
      selectedValue.set('endMultiplicity', this.get('_endMultiplicity'));
      selectedValue.set('startMultiplicity', this.get('_startMultiplicity'));
      this.set('_endRoleStr', undefined);
      this.set('_startRoleStr', undefined);
      this.set('_endMultiplicity', undefined);
      this.set('_startMultiplicity', undefined);
    } else {
      selectedValue.set('attributesStr', this.get('_attributesStr'));
      selectedValue.set('methodsStr', this.get('_methodsStr'));
      this.set('_attributesStr', undefined);
      this.set('_methodsStr', undefined);
    }

    this.set('objectEditFormNamePart', undefined);
    this.set('selectedValue', undefined);
    this.set('selectedValueModel', undefined);

    this.set('isLink', false);
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

    if (this.get('isLink')) {
      return resolve();
    }

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
      let isLink = this.get('isLink');
      if (isLink) {
        updateStrByLink(selectedValue);
      } else {
        updateStrByObjects(selectedValue);
      }

      this.get('appState').loading();
      this.validateData(selectedValue)
      .then(() => applyNewClassName(this.get('store'), this.get('currentProjectContext'), selectedValue))
      .then(() => {
        if (isLink) {
          objectModel.set('endRoleTxt', selectedValue.get('endRoleStr'));
          objectModel.set('startRoleTxt', selectedValue.get('startRoleStr'));
          objectModel.set('endMultiplicity', selectedValue.get('endMultiplicity'));
          objectModel.set('startMultiplicity', selectedValue.get('startMultiplicity'));
        } else {
          objectModel.set('name', selectedValue.get('nameStr'));
          objectModel.set('attributes', selectedValue.get('attributesStr').split('\n'));
          objectModel.set('methods', selectedValue.get('methodsStr').split('\n'));
        }

        this.get('fdDiagramService').updateJointObjectOnDiagram(objectModel.get('id'));
        selectedValue.save()
      })
      .then(() => this.saveHasManyRelationships(selectedValue))
      .catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
        if (isLink) {
          this.set('_endRoleStr', selectedValue.get('endRoleStr'));
          this.set('_startRoleStr', selectedValue.get('startRoleStr'));
          this.set('_endMultiplicity', selectedValue.get('endMultiplicity'));
          this.set('_startMultiplicity', selectedValue.get('startMultiplicity'));
        } else {
          this.set('_attributesStr', selectedValue.get('attributesStr'));
          this.set('_methodsStr', selectedValue.get('methodsStr'));
        }
      });
    }
  }
});
