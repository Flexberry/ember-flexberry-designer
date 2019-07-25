import Component from '@ember/component';
import { isNone, isBlank } from '@ember/utils';
import { computed } from '@ember/object';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import layout from '../templates/components/fd-view-definition-item';

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
    Selected definition property.

    @property selectedPropery
    @type Object
  */
  selectedPropery: undefined,

  /**
    Type selected definition property.

    @property selectedProperyType
    @type Object
  */
  selectedProperyType: undefined,

  /**
    Value search input.

    @property filterValue
    @type String
    @default ''
  */
  filterValue: '',

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
    if (!isNone(name) && name.toLocaleLowerCase().indexOf(filterValue) !== -1) {
      return true;
    }

    return false;
  }),

  /**
    Component is active.

    @method isActive
  */
  isActive: computed('selectedPropery', function() {
    let selectedPropery = this.get('selectedPropery');
    let definition = this.get('definition');

    return selectedPropery === definition ? true : false;
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
      let selectedPropery = this.get('selectedPropery');
      if (selectedPropery !== property) {
        this.set('selectedPropery', property);
        this.set('selectedProperyType', this.get('type'));
      } else {
        this.set('selectedPropery', undefined);
        this.set('selectedProperyType', undefined);
      }
    },
  }
});
