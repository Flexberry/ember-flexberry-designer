import Component from '@ember/component';
import { isNone, isBlank } from '@ember/utils';
import { computed } from '@ember/object';
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
    Value search input.

    @property filterValue
    @type String
    @default ''
  */
  filterValue: '',

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
      } else {
        this.set('selectedPropery', undefined);
      }
    },
  }
});
