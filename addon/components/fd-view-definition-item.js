import Component from '@ember/component';
import { isNone, isBlank } from '@ember/utils';
import { computed } from '@ember/object';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import layout from '../templates/components/fd-view-definition-item';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  tagName: '',

  store: service(),

  /**
    Classes data.

    @property view
    @type Object
  */
  definition: undefined,

  /**
    Selected definition property.

    @property selectedProperty
    @type Object
  */
  selectedProperty: undefined,

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
  isActive: computed('selectedProperty', function() {
    let selectedProperty = this.get('selectedProperty');
    let definition = this.get('definition');

    return selectedProperty === definition;
  }),

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
    selectedProperty(property) {
      let selectedProperty = this.get('selectedProperty');
      const isPropertySelected = !isNone(selectedProperty);
      const isSelectedPropertyChanged = !isNone(selectedProperty) && !isNone(property) && selectedProperty.get('name') !== property.get('name');

      if (!isPropertySelected || isSelectedPropertyChanged) {
        property.set('masterPropertyName', '');
        this.setProperties({
          selectedPropertyType: this.get('type'),
          selectedProperty: property
        });
      } else {
        this.set('selectedProperty', undefined);
        this.set('selectedPropertyType', undefined);
      }
    },
  }
});
