import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
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
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineBaseModel = function (modelClass) {
  modelClass.reopenClass({
    _parentModelName: 'fd-repository-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('EditEditForm', 'fd-dev-form-view', {
    viewForForm: Projection.attr(''),
    view: Projection.belongsTo('fd-dev-view', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('EditListForm', 'fd-dev-form-view', {
    viewForForm: Projection.attr(''),
    dataObjectTypes: Projection.attr(''),
    listFormOperations: Projection.attr(''),
    hierarchicalMaster: Projection.attr(''),
    view: Projection.belongsTo('fd-dev-view', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('EditPrintForm', 'fd-dev-form-view', {
    viewForForm: Projection.attr(''),
    view: Projection.belongsTo('fd-dev-view', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-form-view', {
    view: Projection.belongsTo('fd-dev-view', '', {
      name: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {
        name: Projection.attr('')
      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('ForFormControls', 'fd-dev-form-view', {
    controls: Projection.hasMany('fd-dev-form-control', '', {
      name: Projection.attr(''),
      propertyPath: Projection.attr(''),
      settingsXml: Projection.attr(''),
      order: Projection.attr(''),
      controlType: Projection.belongsTo('fd-dev-control-type', '', {
        name: Projection.attr('')
      }),
      propertyType: Projection.belongsTo('fd-dev-type-definition', '', {
        name: Projection.attr('')
      }),
      formView: Projection.belongsTo('fd-dev-form-view', '', {
        view: Projection.belongsTo('fd-dev-view', '', {

        })
      })
    })
  });
  modelClass.defineProjection('Generator', 'fd-dev-form-view', {
    view: Projection.belongsTo('fd-dev-view', '', {
      name: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {
        name: Projection.attr('')
      }, { hidden: true })
    }),
    dataObjectTypes: Projection.attr('DataObjectTypes', { hidden: true }),
    dataObjectTypesStr: Projection.attr('DataObjectTypesStr', { hidden: true }),
    hierarchicalMaster: Projection.attr('HierarchicalMaster', { hidden: true }),
    listFormOperations: Projection.attr('ListFormOperations', { hidden: true }),
    listFormOperationsStr: Projection.attr('ListFormOperationsStr', { hidden: true }),
    orderNum: Projection.attr('OrderNum', { hidden: true }),
    propertyLookup: Projection.attr('PropertyLookup', { hidden: true }),
    propertyLookupStr: Projection.attr('PropertyLookupStr', { hidden: true }),
    viewForForm: Projection.attr('ViewForForm', { hidden: true }),
    name: Projection.attr('Name', { hidden: true }),
    description: Projection.attr('Description', { hidden: true }),
    nameStr: Projection.attr('NameStr', { hidden: true }),
    controls: Projection.hasMany('fd-dev-form-control', '', {
      name: Projection.attr(''),
      propertyPath: Projection.attr(''),
      settingsXml: Projection.attr(''),
      order: Projection.attr(''),
      controlType: Projection.belongsTo('fd-dev-control-type', '', {
        name: Projection.attr('')
      }),
      propertyType: Projection.belongsTo('fd-dev-type-definition', '', {
        name: Projection.attr('')
      }),
      formView: Projection.belongsTo('fd-dev-form-view', '', {
        view: Projection.belongsTo('fd-dev-view', '', {

        })
      })
    })
  });
  modelClass.defineProjection('GetDataObjectByFormView', 'fd-dev-form-view', {
    view: Projection.belongsTo('fd-dev-view', '', {
      class: Projection.belongsTo('fd-dev-class', '', {
        name: Projection.attr(''),
        stereotype: Projection.attr(''),
        caption: Projection.attr(''),
        stage: Projection.belongsTo('fd-stage', '', {

        })
      })
    }),
    class: Projection.belongsTo('fd-dev-class', '', {
      stage: Projection.belongsTo('fd-stage', '', {

      })
    })
  });
  modelClass.defineProjection('GetFormControlsByFormView', 'fd-dev-form-view', {
    view: Projection.belongsTo('fd-dev-view', '', {

    }),
    class: Projection.belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('GetFormWithView', 'fd-dev-form-view', {
    dataObjectTypesStr: Projection.attr(''),
    view: Projection.belongsTo('fd-dev-view', '', {
      class: Projection.belongsTo('fd-dev-class', '', {
        name: Projection.attr('')
      }),
      definition: Projection.attr('')
    }),
    class: Projection.belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('ListDataObjectTypes', 'fd-dev-form-view', {
    view: Projection.belongsTo('fd-dev-view', '', {
      name: Projection.attr(''),
      class: Projection.belongsTo('fd-dev-class', '', {
        name: Projection.attr('')
      }, { hidden: true })
    }, { hidden: true })
  });
};
