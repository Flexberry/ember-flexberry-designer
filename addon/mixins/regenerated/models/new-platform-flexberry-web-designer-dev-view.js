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
  class: DS.belongsTo('new-platform-flexberry-web-designer-dev-class', { inverse: 'devViews', async: false }),
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
    _parentModelName: 'new-platform-flexberry-web-designer-repository-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('AttributesView', 'new-platform-flexberry-web-designer-dev-view', {
    name: Projection.attr(''),
    properties: Projection.attr(''),
    definition: Projection.attr(''),
    class: Projection.belongsTo('new-platform-flexberry-web-designer-dev-class', '', {

    })
  });
  modelClass.defineProjection('BusinessServer', 'new-platform-flexberry-web-designer-dev-view', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    class: Projection.belongsTo('new-platform-flexberry-web-designer-dev-class', '', {
      stage: Projection.belongsTo('new-platform-flexberry-web-designer-stage', '', {

      })
    })
  });
  modelClass.defineProjection('EditDataObjectClass', 'new-platform-flexberry-web-designer-dev-view', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    properties: Projection.attr('')
  });
  modelClass.defineProjection('EditFormView', 'new-platform-flexberry-web-designer-dev-view', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description')
  });
  modelClass.defineProjection('EditPropertyLookups', 'new-platform-flexberry-web-designer-dev-view', {
    name: Projection.attr(''),
    definition: Projection.attr(''),
    class: Projection.belongsTo('new-platform-flexberry-web-designer-dev-class', '', {
      name: Projection.attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('Generator', 'new-platform-flexberry-web-designer-dev-view', {
    name: Projection.attr(''),
    description: Projection.attr(''),
    definition: Projection.attr(''),
    class: Projection.belongsTo('new-platform-flexberry-web-designer-dev-class', '', {

    })
  });
  modelClass.defineProjection('ListFormView', 'new-platform-flexberry-web-designer-dev-view', {
    class: Projection.belongsTo('new-platform-flexberry-web-designer-dev-class', '', {
      name: Projection.attr('Class')
    }, { hidden: true }),
    name: Projection.attr('View name'),
    properties: Projection.attr('View properties')
  });
  modelClass.defineProjection('Prototyping', 'new-platform-flexberry-web-designer-dev-view', {
    name: Projection.attr(''),
    definition: Projection.attr('')
  });
  modelClass.defineProjection('SearchView', 'new-platform-flexberry-web-designer-dev-view', {
    name: Projection.attr(''),
    class: Projection.belongsTo('new-platform-flexberry-web-designer-dev-class', '', {

    })
  });
  modelClass.defineProjection('ViewManager', 'new-platform-flexberry-web-designer-dev-view', {
    class: Projection.belongsTo('new-platform-flexberry-web-designer-dev-class', 'Класс', {
      name: Projection.attr('Класс'),
      stage: Projection.belongsTo('new-platform-flexberry-web-designer-stage', '', {

      }, { hidden: true })
    }),
    name: Projection.attr('Название представления'),
    properties: Projection.attr('Свойства в представлении'),
    definition: Projection.attr('', { hidden: true })
  });
  modelClass.defineProjection('ViewPeeker', 'new-platform-flexberry-web-designer-dev-view', {
    name: Projection.attr('')
  });
};
