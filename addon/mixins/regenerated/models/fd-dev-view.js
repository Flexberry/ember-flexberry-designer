import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
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
  modelClass.defineProjection('AttributesView', 'fd-dev-view', {
    name: attr(''),
    properties: attr(''),
    definition: attr(''),
    class: belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('BusinessServer', 'fd-dev-view', {
    name: attr(''),
    description: attr(''),
    class: belongsTo('fd-dev-class', '', {
      stage: belongsTo('fd-stage', '', {

      })
    })
  });
  modelClass.defineProjection('EditDataObjectClass', 'fd-dev-view', {
    name: attr(''),
    description: attr(''),
    properties: attr('')
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-view', {
    name: attr('Name'),
    description: attr('Description')
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-view', {
    name: attr(''),
    definition: attr(''),
    class: belongsTo('fd-dev-class', '', {
      name: attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('FdAttributesView', 'fd-dev-view', {
    name: attr(''),
    definition: attr(''),
    class: belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('FdEditClassForm', 'fd-dev-view', {
    name: attr('Имя'),
    description: attr('Описание'),
    class: belongsTo('fd-dev-class', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-view', {
    definition: attr(''),
    name: attr(''),
    description: attr(''),
    nameStr: attr(''),
    class: belongsTo('fd-dev-class', '', {
      name: attr('')
    })
  });
  modelClass.defineProjection('Generator', 'fd-dev-view', {
    name: attr(''),
    description: attr(''),
    definition: attr(''),
    class: belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-view', {
    class: belongsTo('fd-dev-class', '', {
      name: attr('Class')
    }, { hidden: true }),
    name: attr('View name')
  });
  modelClass.defineProjection('Prototyping', 'fd-dev-view', {
    name: attr(''),
    definition: attr('')
  });
  modelClass.defineProjection('SearchView', 'fd-dev-view', {
    name: attr(''),
    class: belongsTo('fd-dev-class', '', {

    })
  });
  modelClass.defineProjection('ViewManager', 'fd-dev-view', {
    class: belongsTo('fd-dev-class', 'Класс', {
      name: attr('Класс'),
      stage: belongsTo('fd-stage', '', {

      }, { hidden: true })
    }),
    name: attr('Название представления'),
    properties: attr('Свойства в представлении'),
    definition: attr('', { hidden: true })
  });
  modelClass.defineProjection('ViewPeeker', 'fd-dev-view', {
    name: attr('')
  });
};
