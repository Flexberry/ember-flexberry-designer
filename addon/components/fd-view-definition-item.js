import Component from '@ember/component';
import { A } from '@ember/array';
import { isNone, isBlank, isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import layout from '../templates/components/fd-view-definition-item';
import { next } from '@ember/runloop';

export default Component.extend({
  layout,
  tagName: '',

  /**
    Classes data.

    @property view
    @type Object
  */
  definition: undefined,

  /**
    Selected definition properties.

    @property selectedProperties
    @type Object
  */
  selectedProperties: A(),

  /**
    All properties of selected master.

    @property masterProperties
    @type Array
  */
  masterProperties: undefined,

  /**
    Type selected definition property.

    @property selectedPropertyType
    @type Object
  */
  selectedPropertyType: undefined,

  /**
    Value search input.

    @property filterValue
    @type String
    @default ''
  */
  filterValue: '',

  /**
    Flag: indicates whether property is readonly.

    @property readonly
    @type Boolean
    @default true
   */
  readonly: false,

  /**
    Type definition property.

    @property type
    @type Object
  */
  type: computed('definition', function() {
    let definition = this.get('definition');
    if (definition instanceof FdViewAttributesDetail) {
      return 'isDetail';
    } else if (definition instanceof FdViewAttributesMaster) {
      return 'isMaster';
    } else {
      return 'isProperty';
    }
  }),

  /**
    Сhecks for matching the desired string

    @method visible
  */
  visible: computed('filterValue', 'definition', function() {
    let filterValue = this.get('filterValue');
    if (isBlank(filterValue)) {
      return true;
    }

    filterValue = filterValue.trim().toLocaleLowerCase();
    let name = this.get('definition.name');
    if (!isNone(name)) {
      return name.toLocaleLowerCase().indexOf(filterValue) !== -1;
    }

    return false;
  }),

  /**
    Component is active.

    @method isActive
  */
  isActive: computed('selectedProperties.length', function() {
    let selectedProperties = this.get('selectedProperties');
    let definition = this.get('definition');

    return selectedProperties.includes(definition);
  }),

  /**
    Get inputManually checkbox value

    @method getInputManuallyValue
    @return {Boolean} If the value masterPropertyName is found in the master property list then `true`, else `false`.
  */
  getInputManuallyValue() {
    const selectedMasterPropertyName = this.get('selectedProperties.firstObject.masterPropertyName');
    if (isEmpty(selectedMasterPropertyName)) {
      return false;
    }

    const masterProperties = this.get('masterProperties');
    if (masterProperties) {
      const selectedMasterPropertyName = this.get('selectedProperties.firstObject.masterPropertyName');
      return masterProperties.filter(masterProperty => masterProperty === selectedMasterPropertyName).length === 0;
    }
    return false;
  },

  actions: {

    /**
      Change visible property.

       @method actions.changeVisible
    */
    changeVisible() {
      let definition = this.get('definition');
      let visible = definition.get('visible');

      definition.set('visible', !visible);
    },

    /**
      Selected definition property.

       @method actions.selectedProperty
       @param {Object} property definition property.
    */
    selectedProperty(property, e) {
      let selectedProperties = this.get('selectedProperties');
      if (selectedProperties.includes(property)) {
        selectedProperties.removeObject(property);
        if (selectedProperties.length === 0) {
          this.set('selectedPropertyType', undefined);
        }
        return;
      }

      if (!e.shiftKey) {
        selectedProperties.clear();
      }

      selectedProperties.pushObject(property);

      // Если это первое выделение, устанавливаем тип и inputManually
      if (selectedProperties.length === 1) {
        this.set('selectedPropertyType', this.get('type'));
        next(() => {
          if (selectedProperties.includes(property)) {
            this.set('selectedProperties.firstObject.inputManually', this.getInputManuallyValue());
          }
        });
      }
    },
  }
});
