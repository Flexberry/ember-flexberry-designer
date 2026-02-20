import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { isNone, isBlank, isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import FdViewAttributesMaster from '../objects/fd-view-attributes-master';
import FdViewAttributesDetail from '../objects/fd-view-attributes-detail';
import layout from '../templates/components/fd-view-definition-item';
import { next } from '@ember/runloop';
import { getDataForBuildTree } from '../utils/fd-attributes-for-tree';

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
    Classes data.

    @property model
    @type Object
  */
  model: undefined,

  /**
    @property store
    @type Service
  */
  store: service(),

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
    Text definition property.

    @property text
    @type String
  */
  text: computed('type', 'definition.name', function() {
    const definitionName = this.get('definition.name');

    const model = this.get('model');
    if (isNone(model)) {
      return definitionName;
    }

    const store = this.get('store');
    const definitionPath = definitionName.split('.');

    if (definitionPath.length === 0) {
      return definitionName;
    }

    let text = '';
    let modelId = model.get('id');
    let modelData = getDataForBuildTree(store, modelId);
    for (let i = 0; i < definitionPath.length - 1; i++) {
      const startRole = definitionPath.at(i);
      const association = modelData.associations.filter((item) =>
        item.get('realStartRole') === startRole || item.get('startRole') === startRole || item.get('startClass.name') === startRole);

      if (association.length === 0) {
        return definitionName;
      }

      modelId = association.at(0).get('startClass.id');
      modelData = getDataForBuildTree(store, modelId);

      const stored = modelData.classes.findBy('id', modelId).get('stored');
      text += (stored ? startRole : '/' + startRole) + '.';
    }

    const type = this.get('type');
    const propertyName = definitionPath.at(-1);

    if (type === 'isMaster') {
      const association = modelData.associations.filter((item) =>
        item.get('realStartRole') === propertyName || item.get('startRole') === propertyName || item.get('startClass.name') === propertyName);

      if (association.length === 0) {
        return text + propertyName;
      }

      modelId = association.at(0).get('startClass.id');
      modelData = getDataForBuildTree(store, modelId);
    } else if (type === 'isDetail') {
      const aggregation = modelData.aggregations.filter((item) =>
        item.get('realEndRole') === propertyName || item.get('endRole') === propertyName || item.get('endClass.name') === propertyName);

      if (aggregation.length === 0) {
        return text + propertyName;
      }
      modelId = aggregation.at(0).get('endClass.id');
      modelData = getDataForBuildTree(store, modelId);
    }

    const propertyClass = modelData.classes.findBy('id', modelId);
    if (isNone(propertyClass)) {
      return text + propertyName;
    }

    let stored = true;
    if (type === 'isProperty') {
      const attribute = propertyClass.get('attributes').findBy('name', propertyName);

      if (isNone(attribute)) {
        return text + propertyName;
      }

      stored = attribute.get('stored');
    } else {
      stored = propertyClass.get('stored');
    }

    return text += stored ? propertyName : '/' + propertyName;
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
    Get inputManually checkbox value

    @method getInputManuallyValue
    @return {Boolean} If the value masterPropertyName is found in the master property list then `true`, else `false`.
  */
  getInputManuallyValue() {
    const selectedMasterPropertyName = this.get('selectedProperty.masterPropertyName');
    if (isEmpty(selectedMasterPropertyName)) {
      return false;
    }

    const masterProperties = this.get('masterProperties');
    if (masterProperties) {
      const selectedMasterPropertyName = this.get('selectedProperty.masterPropertyName');
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
    selectedProperty(property) {
      let selectedProperty = this.get('selectedProperty');
      if (selectedProperty !== property) {
        this.set('selectedProperty', property);
        this.set('selectedPropertyType', this.get('type'));
        next(() => {
          this.set('selectedProperty.inputManually', this.getInputManuallyValue());
        })
      } else {
        this.set('selectedProperty', undefined);
        this.set('selectedPropertyType', undefined);
      }
    },
  }
});
