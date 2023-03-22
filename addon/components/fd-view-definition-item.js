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

  /**
    Sets available properties of selected master by its association in `masterPropertyName` dropdown
    
    @param {Object} property 
    @returns 
   */
  setMasterProperties(property) {
    if (isBlank(property)) return;

    let store = this.get('store');
    let associationName = property.name;
    let allAssociations = store.peekAll('fd-dev-association').filterBy('realStartRole', associationName);

    if (allAssociations.length <= 0) return;

    let masterProperties = allAssociations.objectAt(0).get('endClass.attributes').mapBy('name');

    if (masterProperties.length >= 1) this.set('masterProperties', masterProperties);
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
    selectedProperty(property) {
      let selectedProperty = this.get('selectedProperty');

      if (selectedProperty !== property) {
        this.set('selectedProperty', property);
        this.set('selectedPropertyType', this.get('type'));
      } else {
        this.set('selectedProperty', undefined);
        this.set('selectedPropertyType', undefined);
      }

      this.setMasterProperties(property);
    },
  }
});
