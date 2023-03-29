import Component from '@ember/component';
import { isNone, isBlank } from '@ember/utils';
import { computed, observer } from '@ember/object';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import layout from '../templates/components/fd-view-definition-item';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  tagName: '',

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
  */
  currentProjectContext: service('fd-current-project-context'),

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
    Fill master properties lookup.

    @method selectedPropertyObserver
  */
  selectedPropertyObserver: observer('selectedProperty.lookupType', function() {
    let selectedPropertyType = this.get('selectedPropertyType');
    
    if (selectedPropertyType === 'isMaster') {
      let selectedProperty = this.get('selectedProperty');

      this.setMasterProperties(selectedProperty);
    }
  }),

  /**
    Sets available properties of selected master by its association in `masterPropertyName` dropdown
    
    @param {Object} property 
    @returns 
   */
  setMasterProperties(property) {
    if (isBlank(property)) {
      return;
    }

    const store = this.get('store');
    const stageId = this.get('currentProjectContext').getCurrentStageModel().get('id');
    const associationName = property.name;
    const currentStageInheritance = store.peekAll('fd-dev-inheritance').filterBy('stage.id', stageId);
    const currentStageAssociations = store.peekAll('fd-dev-association').filterBy('stage.id', stageId);
    const currentStageAggregation = store.peekAll('fd-dev-aggregation').filterBy('stage.id', stageId);
    const masterAssociations = currentStageAssociations.filterBy('realStartRole', associationName);
    let masterProperties = null;
    let inheritedProperties = null;
    let aggregationProperties = null;
    let parentClasses = currentStageInheritance.map((inheritance) => {
      if (masterAssociations.length > 0) {
        if (inheritance.get('child.name') === masterAssociations[0].get('endClass.name') && !isNone(inheritance.get('parent'))) {
          return inheritance.get('parent');
        }
      }
    })
    
    parentClasses = parentClasses.filter(elem => !isNone(elem));

    if (parentClasses.length > 0) {
      inheritedProperties = parentClasses.map((item) => item.get('attributes').mapBy('name'));
    }

    if (masterAssociations.length > 0) {
      masterProperties = masterAssociations.map((association) => {
        return association.get('startClass.attributes').mapBy('name');
      });
    }

    if (currentStageAggregation.length > 0) {
      aggregationProperties = currentStageAggregation.map((association) => {
        return association.get('startClass.attributes').mapBy('name');
      });
    }

    const result = [
      inheritedProperties,
      masterProperties,
      aggregationProperties
    ].flat(2);

    this.set('masterProperties', result);
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
    },
  }
});
