import FdBaseSheet from './fd-base-sheet';
import { computed, set, get } from '@ember/object';
import { isBlank, isNone } from '@ember/utils';
import { A } from '@ember/array';
import { updateStrByObjects } from '../../utils/fd-update-str-value';
import { Promise, resolve, reject } from 'rsvp';
import { createClassPrimitive, deletePrimitives, applyNewClassName } from '../../utils/fd-update-class-diagram';
import { updateAuditAttributes } from '../../utils/fd-attributes-for-audit';
import { translationMacro as t } from 'ember-i18n';

import layout from '../../templates/components/fd-sheets/fd-class-sheet';

export default FdBaseSheet.extend({
  layout,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default 'class-sheet'
  */
  sheetComponentName: 'class-sheet',

  /**
    Sheet view name.

    @property nestedSheetName
    @type String
    @default 'view-sheet'
  */
  nestedSheetName: 'view-sheet',

  /**
    Data.

    @property model
    @type Object
  */
  model: undefined,

  /**
    Value selected entity.

    @property selectedValue
    @type Object
  */
  selectedValue: undefined,

  /**
    Flag: indicates whether to show create editing panel.

    @property isAddMode
    @type Bool
    @default false
  */
  isAddMode: false,

  /**
    Sheet title value.

    @method computedTitle
  */
  computedTitle: computed('isAddMode', 'i18n.locale', 'selectedValue', {
    get() {
      return this.get('isAddMode') ? t('components.fd-create-entity.caption') : this.get('selectedValue.data.name');
    },
    set(key, value) {
      if (!this.get('isAddMode')) {
        this.set('selectedValue.data.name', value);
      }

      return value;
    }
  }),

  /**
    Removes quotes from class stereotype.

    @method componentNamePart
  */
  componentNamePart: computed('selectedValue', function() {
    let selectedValue = this.get('selectedValue');
    if (!isNone(selectedValue)) {
      let stereotype = get(selectedValue, 'data.stereotype');
      if (isBlank(stereotype)) {
        return 'implementation';
      }

      return stereotype.substring(1, stereotype.length - 1);
    }
  }),

  /**
    Url video help.

    @method urlVideoHelp
  */
  urlVideoHelp: computed('componentNamePart', function() {
    let componentNamePart = this.get('componentNamePart');
    if (isNone(componentNamePart)) {
      return;
    }

    let componentName = `fd-editing-panels/fd-${componentNamePart}-editing-panel`;
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
    this.set('readonlyMode', true);
    this.set('selectedValue', currentItem);
    if (!isNone(currentItem)) {
      this.set('isAddMode', false);
    }
  },

  /**
    Closing sheet.

     @method closeSheet
     @param {String} sheetName Sheet's name.
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
      set(selectedValue, 'active', false);
    }
  },

  /**
    Update bs value in model.

     @method updateClassModel
     @param {Object} modelSelectedValue Model object.
  */
  updateClassModel(modelSelectedValue) {
    let stereotype = modelSelectedValue.get('stereotype');
    if (stereotype === '«implementation»' || isBlank(stereotype)) {
      let model = this.get('model');
      let classObj = model.classes.findBy('settings.data.id', modelSelectedValue.id);
      let bs = modelSelectedValue.get('businessServerClass');
      let bsModel = isNone(bs) ? null : { data: bs, active: false };
      set(classObj, 'bs', bsModel);
    }
  },

  /**
    Find array in model.

     @method getModelArrayByStereotype
     @param {Object} model Model object.
  */
  getModelArrayByStereotype(model) {
    let findArray;
    switch (model.get('stereotype')) {
      case null:
      case '':
      case '«implementation»':
        findArray = this.get('model.classes');
        break;
      case '«listform»': {
        let dataObjectId = model.get('formViews.firstObject.view.class.id');
        let classArray = this.get('model.classes').findBy('settings.data.id', dataObjectId);
        findArray = classArray.listForms;
        break;
      }
      case '«editform»': {
        let dataObjectId = model.get('formViews.firstObject.view.class.id');
        let classArray = this.get('model.classes').findBy('settings.data.id', dataObjectId);
        findArray = classArray.editForms;
        break;
      }
      case '«enumeration»':
        findArray = this.get('model.enums');
        break;
      case '«typedef»':
        findArray = this.get('model.typedefs');
        break;
      case '«type»':
        findArray = this.get('model.types');
        break;
      case '«application»':
        findArray = this.get('model.applications');
        break;
      case '«businessserver»':
        findArray = this.get('model.bs');
        break;
      case '«external»':
        findArray = this.get('model.externals');
        break;
      case '«externalinterface»':
        findArray = this.get('model.externalinterface');
        break;
      case '«interface»':
        findArray = this.get('model.interfaces');
        break;
      case '«userform»':
        findArray = this.get('model.userforms');
        break;
      case '«geolayer»':
        findArray = this.get('model.geolayers');
        break;
      case '«geolayerstyle»':
        findArray = this.get('model.geolayerstyles');
        break;
      default:
        findArray = this.get('model.userstereotypes');
    }

    return findArray;
  },

  /**
    Add in model new classes.

     @method addNewClassInModel
  */
  addNewClassInModel() {
    let model = this.get('selectedValue');
    let modelHash = this.getModelArrayByStereotype(model.data);

    if (model.data.get('stereotype') === '«implementation»') {
      modelHash.pushObject({ settings: model, editForms: A(), listForms: A(), parents: A(), bs: null });
    } else {
      modelHash.pushObject(model);
    }

    this.get('updateModel')();
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

    // Get current classes.
    let allClasses = this.get('store').peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', this.get('currentProjectContext').getCurrentStage());
    let currentClass = A(classesCurrentStage).find((a) => {
      return a.get('name') === modelName && a.get('id') !== modelId;
    });

    if (!isNone(currentClass)) {
      return reject({ message: this.get('i18n').t('forms.fd-application-model.error-message.exist-class').toString() });
    }

    if ((model.get('stereotype') === '«editform»' || model.get('stereotype') === '«listform»') && isNone(model.get('formViews.firstObject.view'))) {
      return reject({ message: this.get('i18n').t('forms.fd-application-model.error-message.view-form').toString() });
    }

    return resolve();
  },

  actions: {
    /**
      Save 'selectedValue'.

       @method actions.save
       @param {Boolean} closeAfter Close after save.
    */
    save(closeAfter) {
      const selectedValue = this.get('selectedValue');
      let model = get(selectedValue, 'data');
      this.get('appState').loading();
      updateAuditAttributes(model, this.get('store'));
      updateStrByObjects(model);

      let isNew = model.get('isNew');
      this.validateData(model)
      .then(() => applyNewClassName(this.get('store'), this.get('currentProjectContext'), model))
      .then(() => model.save())
      .then(() => this.saveHasManyRelationships(model))
      .then(() => {
        if (isNew) {
          this.addNewClassInModel();
          let diagram = createClassPrimitive(this.get('store'), this.get('currentProjectContext'), model);
          return diagram.save();
        }

        return resolve();
      })
      .then(() => {
        this.updateClassModel(model);
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
      Delete selected class.

      @method actions.delete
      @param {Boolean} confirmation
    */
    delete(confirmation) {
      if (isNone(confirmation)) {
        this.get('fdDialogService').showVerificationMessage(this.get('i18n').t('components.fd-modal-message-box.delete-text').toString(), this.get('actions.delete'), this);
        return;
      }

      const store = this.get('store');
      let selectedValue = this.get('selectedValue.data');
      let modelHash = this.getModelArrayByStereotype(selectedValue);

      let deleteObjectClass;
      let deleteModels = A();
      let updateModels = A();
      let stereotype = selectedValue.get('stereotype');
      if (stereotype === '«businessserver»') {
        let bsInClass = this.get('model.classes').filterBy('bs.data.id', selectedValue.id);
        bsInClass.forEach((item) => {
          let setting = item.settings.data;
          setting.set('businessServerClass', null);
          updateModels.pushObject(setting);
        });
      }

      if (stereotype === '«implementation»' || isBlank(stereotype)) {
        deleteObjectClass = modelHash.findBy('settings.data.id', selectedValue.id);
        deleteModels.pushObjects(deleteObjectClass.listForms);
        deleteModels.pushObjects(deleteObjectClass.editForms);
        deleteModels.pushObject(deleteObjectClass.settings);
      } else {
        deleteObjectClass = modelHash.findBy('data.id', selectedValue.id);
        deleteModels.pushObject(deleteObjectClass);
      }

      this.get('appState').loading();
      let modelsForBatchUpdate = deleteModels.map((a) => {
        let data = a.data;
        data.deleteRecord();

        return data;
      });

      let primitivesOnDelete = deletePrimitives(store, this.get('currentProjectContext'), deleteModels.map((a) => a.data));
      A(modelsForBatchUpdate).pushObjects(primitivesOnDelete);

      return new Promise((resolve) => {
        if (updateModels.length > 0) {
          return store.batchUpdate(updateModels).then(() => {
            updateModels.forEach((model) => {
              this.updateClassModel(model);
            });

            return resolve();
          });
        }

        return resolve();
      })
      .then(() => store.batchUpdate(modelsForBatchUpdate))
      .then(() => {
        modelHash.removeObject(deleteObjectClass);
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
  }
});
