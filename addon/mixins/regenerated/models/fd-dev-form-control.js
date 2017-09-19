import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  name: DS.attr('string'),
  order: DS.attr('number'),
  propertyPath: DS.attr('string'),
  settingsXml: DS.attr('string'),
  controlType: DS.belongsTo('fd-dev-control-type', { inverse: null, async: false }),
  propertyType: DS.belongsTo('fd-dev-type-definition', { inverse: null, async: false }),
  formView: DS.belongsTo('fd-dev-form-view', { inverse: 'controls', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      name: { presence: true },
      controlType: { presence: true },
      propertyType: { presence: true },
      formView: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('FormControlE', 'fd-dev-form-control', {
    name: Projection.attr('Имя'),
    propertyPath: Projection.attr('Свойство'),
    settingsXml: Projection.attr('Настройки'),
    controlType: Projection.belongsTo('fd-dev-control-type', 'Тип элемента управления', {
      name: Projection.attr('', { hidden: true })
    }),
    order: Projection.attr('', { hidden: true }),
    propertyType: Projection.belongsTo('fd-dev-type-definition', 'Тип свойства', {
      name: Projection.attr('', { hidden: true })
    })
  });
  modelClass.defineProjection('FormControlFullGet', 'fd-dev-form-control', {
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
  });
  modelClass.defineProjection('FormControlL', 'fd-dev-form-control', {
    name: Projection.attr('Имя'),
    controlType: Projection.belongsTo('fd-dev-control-type', '', {
      name: Projection.attr('Тип эдемента управления')
    }, { hidden: true }),
    order: Projection.attr('', { hidden: true }),
    propertyType: Projection.belongsTo('fd-dev-type-definition', '', {
      name: Projection.attr('Тип свойства')
    }, { hidden: true })
  });
};
