import FdBaseSheet from './fd-base-sheet';
import { updateObjectByStr, updateStrByObjects } from '../../utils/fd-update-str-value';
import { inject as service } from '@ember/service';

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
      objectModel.set('attributes', selectedValue.get('attributesStr').split('\n'));
      objectModel.set('methods', selectedValue.get('methodsStr').split('\n'));
      if (selectedValue.get('isNew')) {
        selectedValue.set('nameStr', selectedValue.get('name'));
      }

      this.get('fdDiagramService').updateJointObjectOnDiagram(objectModel.get('id'));
      selectedValue.save()
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
