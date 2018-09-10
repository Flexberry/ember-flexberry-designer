import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  /**
    Non-stored property.

    @property name
  */
  name: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'nameCompute' method in model class (outside of this mixin) if you want to compute value of 'name' property.

    @method _nameCompute
    @private
    @example
      ```javascript
      _nameChanged: Ember.on('init', Ember.observer('name', function() {
        Ember.run.once(this, '_nameCompute');
      }))
      ```
  */
  _nameCompute: function() {
    let result = (this.nameCompute && typeof this.nameCompute === 'function') ? this.nameCompute() : null;
    this.set('name', result);
  },
  /**
    Non-stored property.

    @property primitiveTypes
  */
  primitiveTypes: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'primitiveTypesCompute' method in model class (outside of this mixin) if you want to compute value of 'primitiveTypes' property.

    @method _primitiveTypesCompute
    @private
    @example
      ```javascript
      _primitiveTypesChanged: Ember.on('init', Ember.observer('primitiveTypes', function() {
        Ember.run.once(this, '_primitiveTypesCompute');
      }))
      ```
  */
  _primitiveTypesCompute: function() {
    let result = (this.primitiveTypesCompute && typeof this.primitiveTypesCompute === 'function') ? this.primitiveTypesCompute() : null;
    this.set('primitiveTypes', result);
  },
  /**
    Non-stored property.

    @property primitives
  */
  primitives: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'primitivesCompute' method in model class (outside of this mixin) if you want to compute value of 'primitives' property.

    @method _primitivesCompute
    @private
    @example
      ```javascript
      _primitivesChanged: Ember.on('init', Ember.observer('primitives', function() {
        Ember.run.once(this, '_primitivesCompute');
      }))
      ```
  */
  _primitivesCompute: function() {
    let result = (this.primitivesCompute && typeof this.primitivesCompute === 'function') ? this.primitivesCompute() : null;
    this.set('primitives', result);
  },
  /**
    Non-stored property.

    @property helpKeyword
  */
  helpKeyword: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'helpKeywordCompute' method in model class (outside of this mixin) if you want to compute value of 'helpKeyword' property.

    @method _helpKeywordCompute
    @private
    @example
      ```javascript
      _helpKeywordChanged: Ember.on('init', Ember.observer('helpKeyword', function() {
        Ember.run.once(this, '_helpKeywordCompute');
      }))
      ```
  */
  _helpKeywordCompute: function() {
    let result = (this.helpKeywordCompute && typeof this.helpKeywordCompute === 'function') ? this.helpKeywordCompute() : null;
    this.set('helpKeyword', result);
  },
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineBaseModel = function (modelClass) {
  modelClass.defineProjection('EditFormView', 'fd-dev-uml-dpd', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description')
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-uml-dpd', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description'),
    changeUser: Projection.attr('Change user'),
    changeDate: Projection.attr('Change date'),
    createUser: Projection.attr('Create user'),
    createDate: Projection.attr('Create date'),
    subsystem: Projection.belongsTo('fd-subsystem', '', {
      stage: Projection.belongsTo('fd-stage', '', {
      }, { hidden: true }),
    }, { hidden: true }),
  });
  modelClass.defineProjection('SearchDiagram', 'fd-dev-uml-dpd', {
    name: Projection.attr(''),
    subsystem: Projection.belongsTo('fd-subsystem', '', {
      stage: Projection.belongsTo('fd-stage', '', {

      }),
    }),
  });
  modelClass.defineProjection('FdUmlDpd', 'fd-dev-uml-dpd', {
    name: Projection.attr(''),
    primitivesJsonString: Projection.attr(''),
    primitivesStreamString: Projection.attr(''),
    caseObjectsString: Projection.attr(''),
    subsystem: Projection.belongsTo('fd-subsystem', '', {

    })
  });
};
