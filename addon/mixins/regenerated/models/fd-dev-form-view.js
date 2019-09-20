import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo, hasMany } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  /**
    Non-stored property.

    @property dataObjectTypes
  */
  dataObjectTypes: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'dataObjectTypesCompute' method in model class (outside of this mixin) if you want to compute value of 'dataObjectTypes' property.

    @method _dataObjectTypesCompute
    @private
    @example
      ```javascript
      _dataObjectTypesChanged: Ember.on('init', Ember.observer('dataObjectTypes', function() {
        Ember.run.once(this, '_dataObjectTypesCompute');
      }))
      ```
  */
  _dataObjectTypesCompute: function() {
    let result = (this.dataObjectTypesCompute && typeof this.dataObjectTypesCompute === 'function') ? this.dataObjectTypesCompute() : null;
    this.set('dataObjectTypes', result);
  },
  dataObjectTypesStr: DS.attr('string'),
  hierarchicalMaster: DS.attr('string'),
  /**
    Non-stored property.

    @property listFormOperations
  */
  listFormOperations: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'listFormOperationsCompute' method in model class (outside of this mixin) if you want to compute value of 'listFormOperations' property.

    @method _listFormOperationsCompute
    @private
    @example
      ```javascript
      _listFormOperationsChanged: Ember.on('init', Ember.observer('listFormOperations', function() {
        Ember.run.once(this, '_listFormOperationsCompute');
      }))
      ```
  */
  _listFormOperationsCompute: function() {
    let result = (this.listFormOperationsCompute && typeof this.listFormOperationsCompute === 'function') ? this.listFormOperationsCompute() : null;
    this.set('listFormOperations', result);
  },
  listFormOperationsStr: DS.attr('string'),
  orderNum: DS.attr('number'),
  /**
    Non-stored property.

    @property propertyLookup
  */
  propertyLookup: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'propertyLookupCompute' method in model class (outside of this mixin) if you want to compute value of 'propertyLookup' property.

    @method _propertyLookupCompute
    @private
    @example
      ```javascript
      _propertyLookupChanged: Ember.on('init', Ember.observer('propertyLookup', function() {
        Ember.run.once(this, '_propertyLookupCompute');
      }))
      ```
  */
  _propertyLookupCompute: function() {
    let result = (this.propertyLookupCompute && typeof this.propertyLookupCompute === 'function') ? this.propertyLookupCompute() : null;
    this.set('propertyLookup', result);
  },
  propertyLookupStr: DS.attr('string'),
  /**
    Non-stored property.

    @property viewForForm
  */
  viewForForm: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'viewForFormCompute' method in model class (outside of this mixin) if you want to compute value of 'viewForForm' property.

    @method _viewForFormCompute
    @private
    @example
      ```javascript
      _viewForFormChanged: Ember.on('init', Ember.observer('viewForForm', function() {
        Ember.run.once(this, '_viewForFormCompute');
      }))
      ```
  */
  _viewForFormCompute: function() {
    let result = (this.viewForFormCompute && typeof this.viewForFormCompute === 'function') ? this.viewForFormCompute() : null;
    this.set('viewForForm', result);
  },
  view: DS.belongsTo('fd-dev-view', { inverse: null, async: false }),
  class: DS.belongsTo('fd-dev-class', { inverse: 'formViews', async: false }),
  controls: DS.hasMany('fd-dev-form-control', { inverse: 'formView', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      view: { presence: true },
      class: { presence: true }
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});
export let defineBaseModel = function (modelClass) {
  modelClass.reopenClass({
    _parentModelName: 'fd-repository-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('EditEditForm', 'fd-dev-form-view', {
    viewForForm: attr(''),
    view: belongsTo('fd-dev-view', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('EditListForm', 'fd-dev-form-view', {
    viewForForm: attr(''),
    dataObjectTypesStr: attr(''),
    listFormOperationsStr: attr(''),
    hierarchicalMaster: attr(''),
    view: belongsTo('fd-dev-view', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('EditPrintForm', 'fd-dev-form-view', {
    viewForForm: attr(''),
    view: belongsTo('fd-dev-view', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-form-view', {
    view: belongsTo('fd-dev-view', '', {
      name: attr(''),
      class: belongsTo('fd-dev-class', '', {
        name: attr('')
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-form-view', {
    view: belongsTo('fd-dev-view', '', {
      class: belongsTo('fd-dev-class', '', {
        name: attr('')
      })
    }),
    dataObjectTypesStr: attr('')
  });
  modelClass.defineProjection('ForFormControls', 'fd-dev-form-view', {
    controls: hasMany('fd-dev-form-control', '', {
      name: attr(''),
      propertyPath: attr(''),
      settingsXml: attr(''),
      order: attr(''),
      controlType: belongsTo('fd-dev-control-type', '', {
        name: attr('')
      }),
      propertyType: belongsTo('fd-dev-type-definition', '', {
        name: attr('')
      }),
      formView: belongsTo('fd-dev-form-view', '', {
        view: belongsTo('fd-dev-view', '', {

        })
      })
    })
  });
  modelClass.defineProjection('Generator', 'fd-dev-form-view', {
    view: belongsTo('fd-dev-view', '', {
      name: attr(''),
      class: belongsTo('fd-dev-class', '', {
        name: attr('')
      }, { hidden: true })
    }),
    dataObjectTypes: attr('DataObjectTypes', { hidden: true }),
    dataObjectTypesStr: attr('DataObjectTypesStr', { hidden: true }),
    hierarchicalMaster: attr('HierarchicalMaster', { hidden: true }),
    listFormOperations: attr('ListFormOperations', { hidden: true }),
    listFormOperationsStr: attr('ListFormOperationsStr', { hidden: true }),
    orderNum: attr('OrderNum', { hidden: true }),
    propertyLookup: attr('PropertyLookup', { hidden: true }),
    propertyLookupStr: attr('PropertyLookupStr', { hidden: true }),
    viewForForm: attr('ViewForForm', { hidden: true }),
    name: attr('Name', { hidden: true }),
    description: attr('Description', { hidden: true }),
    nameStr: attr('NameStr', { hidden: true }),
    controls: hasMany('fd-dev-form-control', '', {
      name: attr(''),
      propertyPath: attr(''),
      settingsXml: attr(''),
      order: attr(''),
      controlType: belongsTo('fd-dev-control-type', '', {
        name: attr('')
      }),
      propertyType: belongsTo('fd-dev-type-definition', '', {
        name: attr('')
      }),
      formView: belongsTo('fd-dev-form-view', '', {
        view: belongsTo('fd-dev-view', '', {

        })
      })
    })
  });
  modelClass.defineProjection('GetDataObjectByFormView', 'fd-dev-form-view', {
    view: belongsTo('fd-dev-view', '', {
      class: belongsTo('fd-dev-class', '', {
        name: attr(''),
        stereotype: attr(''),
        caption: attr(''),
        stage: belongsTo('fd-stage', '', {

        })
      })
    }),
    class: belongsTo('fd-dev-class', '', {
      stage: belongsTo('fd-stage', '', {

      })
    })
  });
  modelClass.defineProjection('GetFormControlsByFormView', 'fd-dev-form-view', {
    view: belongsTo('fd-dev-view', '', {

    }),
    class: belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('GetFormWithView', 'fd-dev-form-view', {
    dataObjectTypesStr: attr(''),
    view: belongsTo('fd-dev-view', '', {
      class: belongsTo('fd-dev-class', '', {
        name: attr('')
      }),
      definition: attr('')
    }),
    class: belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('ListDataObjectTypes', 'fd-dev-form-view', {
    view: belongsTo('fd-dev-view', '', {
      name: attr(''),
      class: belongsTo('fd-dev-class', '', {
        name: attr('')
      }, { hidden: true })
    }, { hidden: true })
  });
};
