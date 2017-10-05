import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  definition: DS.attr('string'),
  /**
    Non-stored property.

    @property properties
  */
  properties: DS.attr('string'),
  /**
    Method to set non-stored property.
    Please, use code below in model class (outside of this mixin) otherwise it will be replaced during regeneration of models.
    Please, implement 'propertiesCompute' method in model class (outside of this mixin) if you want to compute value of 'properties' property.

    @method _propertiesCompute
    @private
    @example
      ```javascript
      _propertiesChanged: Ember.on('init', Ember.observer('properties', function() {
        Ember.run.once(this, '_propertiesCompute');
      }))
      ```
  */
  _propertiesCompute: function() {
    let result = (this.propertiesCompute && typeof this.propertiesCompute === 'function') ? this.propertiesCompute() : null;
    this.set('properties', result);
  },
  class: DS.belongsTo('fd-dev-class', { inverse: 'views', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
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
  modelClass.defineProjection('AttributesView', 'fd-dev-view', {
    name: Projection.attr(''),
    properties: Projection.attr(''),
    definition: Projection.attr(''),
    class: Projection.belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('BusinessServer', 'fd-dev-view', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    class: Projection.belongsTo('fd-dev-class', '', {
      stage: Projection.belongsTo('fd-stage', '', {

      })
    })
  });
  modelClass.defineProjection('EditDataObjectClass', 'fd-dev-view', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    properties: Projection.attr('')
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-view', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description')
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-view', {
    name: Projection.attr(''),
    definition: Projection.attr(''),
    class: Projection.belongsTo('fd-dev-class', '', {
      name: Projection.attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('Generator', 'fd-dev-view', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    definition: Projection.attr(''),
    class: Projection.belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-view', {
    class: Projection.belongsTo('fd-dev-class', '', {
      name: Projection.attr('Class')
    }, { hidden: true }),
    name: Projection.attr('View name'),
    properties: Projection.attr('View properties')
  });
  modelClass.defineProjection('Prototyping', 'fd-dev-view', {
    name: Projection.attr(''),
    definition: Projection.attr('')
  });
  modelClass.defineProjection('SearchView', 'fd-dev-view', {
    name: Projection.attr(''),
    class: Projection.belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('ViewManager', 'fd-dev-view', {
    class: Projection.belongsTo('fd-dev-class', 'Класс', {
      name: Projection.attr('Класс'),
      stage: Projection.belongsTo('fd-stage', '', {

      }, { hidden: true })
    }),
    name: Projection.attr('Название представления'),
    properties: Projection.attr('Свойства в представлении'),
    definition: Projection.attr('', { hidden: true })
  });
  modelClass.defineProjection('ViewPeeker', 'fd-dev-view', {
    name: Projection.attr('')
  });
};
