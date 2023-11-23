import FdBaseSheet from './fd-base-sheet';
import { updateObjectByStr, updateStrByObjects, updateLinkByStr, updateStrByLink } from '../../utils/fd-update-str-value';
import { applyNewClassName } from '../../utils/fd-update-class-diagram';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { isBlank, isNone } from '@ember/utils';
import { resolve, reject } from 'rsvp';
import { translationMacro as t } from 'ember-i18n';
import { computed } from '@ember/object';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import Builder from 'ember-flexberry-data/query/builder';

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
    Url video help.

    @method urlVideoHelp
  */
  urlVideoHelp: computed('objectEditFormNamePart', function() {
    let componentNamePart = this.get('objectEditFormNamePart');
    if (isNone(componentNamePart)) {
      return;
    }

    let isLink = this.get('isLink') ? '-link' : '';
    let componentName = `fd-editing-panels/fd-${componentNamePart}-editing-panel${isLink}`;
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
    this.rollbackSelectedValue();

    let stereotype;
    let isLink = currentItem.isLink;
    let selectedValue = currentItem.data;
    let selectedValueModel = currentItem.selectedValueModel;
    if (isLink) {
      stereotype = selectedValueModel.get('primitive.$type').slice(18, -8).toLocaleLowerCase();

      updateLinkByStr(selectedValue);
      this.set('_endRoleStr', selectedValue.get('endRoleStr'));
      this.set('_startRoleStr', selectedValue.get('startRoleStr'));
      this.set('_endMultiplicity', selectedValue.get('endMultiplicity'));
      this.set('_startMultiplicity', selectedValue.get('startMultiplicity'));
    } else {
      stereotype = selectedValueModel.getWithDefault('stereotype', '').trim().slice(1, -1) || 'implementation';

      updateObjectByStr(selectedValue, this.get('store'));
      this.set('_attributesStr', selectedValue.get('attributesStr'));
      this.set('_methodsStr', selectedValue.get('methodsStr'));
    }

    this.set('isLink', isLink);
    this.set('selectedValue', selectedValue);
    this.set('objectEditFormNamePart', stereotype);
    this.set('selectedValueModel', selectedValueModel);
  },

  /**
    Closing sheet.

     @method closeSheet
  */
  closeSheet() {
    this.rollbackSelectedValue();
    if (this.get('isLink')) {
      this.set('_endRoleStr', undefined);
      this.set('_startRoleStr', undefined);
      this.set('_endMultiplicity', undefined);
      this.set('_startMultiplicity', undefined);
    } else {
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
    Rollback 'selectedValue'.

     @method rollbackSelectedValue
  */
  rollbackSelectedValue() {
    let selectedValue = this.get('selectedValue');
    if (!isNone(selectedValue)) {
      let isLink = this.get('isLink');
      if (!selectedValue.get('isNew')) {
        //selectedValue.rollbackAll();
        if (isLink) {
          selectedValue.set('endRoleStr', this.get('_endRoleStr'));
          selectedValue.set('startRoleStr', this.get('_startRoleStr'));
          selectedValue.set('endMultiplicity', this.get('_endMultiplicity'));
          selectedValue.set('startMultiplicity', this.get('_startMultiplicity'));
        } else {
          selectedValue.set('attributesStr', this.get('_attributesStr'));
          selectedValue.set('methodsStr', this.get('_methodsStr'));
        }
      } else {
        let objectModel = this.get('selectedValueModel');
        if (isLink) {
          updateStrByLink(selectedValue);
          objectModel.set('endRoleTxt', selectedValue.get('endRoleStr'));
          objectModel.set('startRoleTxt', selectedValue.get('startRoleStr'));
          objectModel.set('endMultiplicity', selectedValue.get('endMultiplicity'));
          objectModel.set('startMultiplicity', selectedValue.get('startMultiplicity'));
        } else {
          updateStrByObjects(selectedValue);
          objectModel.set('name', selectedValue.get('nameStr'));
          objectModel.set('attributes', selectedValue.get('attributesStr').split('\n'));
          objectModel.set('methods', selectedValue.get('methodsStr').split('\n'));
        }

        this.get('fdDiagramService').updateJointObjectOnDiagram(objectModel.get('id'));
      }
    }
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

  /**
    Uploading audit fields.

    @method uploadingAuditFields
    @param {Object} selectedValue Class model.
    @param {Object} objectModel Value selected object.
  */
  uploadingAuditFields(selectedValue, objectModel) {
    const attributes = selectedValue.get('attributes');

    let auditFields = attributes.filter(attribute => {
      if ((attribute.get('name') == 'CreateTime' && attribute.get('type') == 'AuditNullableDateTime') ||
          (attribute.get('name') == 'Creator' && attribute.get('type') == 'string') ||
          (attribute.get('name') == 'EditTime' && attribute.get('type') == 'AuditNullableDateTime') ||
          (attribute.get('name') == 'Editor' && attribute.get('type') == 'string')
      ) {
        return attribute;
      }
     });

    if (auditFields.length == 0) {
      const predicate = new SimplePredicate('id', 'eq', selectedValue.get('id'));
      const modelName = 'fd-dev-class';
      const builder = new Builder(this.get('store'))
        .from(modelName)
        .selectByProjection('AttributesView')
        .where(predicate);
      this.get('store').query(modelName, builder.build()).then(() => {
        objectModel.set('attributes', selectedValue.get('attributesStr').split('\n'));
        this.get('fdDiagramService').updateJointObjectOnDiagram(objectModel.get('id'));
      });
    }
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
        selectedValue.save().then(() => {
          if (selectedValue.get('addAuditFields') && !isLink) {
            this.uploadingAuditFields(selectedValue, objectModel);
          }
        });
      })
      .then(() => this.saveHasManyRelationships(selectedValue))
      .then(() => {
        if (isLink) {
          this.set('_endRoleStr', selectedValue.get('endRoleStr'));
          this.set('_startRoleStr', selectedValue.get('startRoleStr'));
          this.set('_endMultiplicity', selectedValue.get('endMultiplicity'));
          this.set('_startMultiplicity', selectedValue.get('startMultiplicity'));
        } else {
          this.set('_attributesStr', selectedValue.get('attributesStr'));
          this.set('_methodsStr', selectedValue.get('methodsStr'));
        }

        this.get('fdSheetService').successSaveModel(this.get('sheetComponentName'));
      })
      .catch((error) => {
        this.get('fdDialogService').showErrorMessage(error.message);
      })
      .finally(() => {
        this.get('appState').reset();
      });
    }
  }
});
