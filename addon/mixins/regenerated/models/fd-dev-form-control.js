import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
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
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('FormControlE', 'fd-dev-form-control', {
    name: attr('Имя'),
    propertyPath: attr('Свойство'),
    settingsXml: attr('Настройки'),
    controlType: belongsTo('fd-dev-control-type', 'Тип элемента управления', {
      name: attr('', { hidden: true })
    }),
    order: attr('', { hidden: true }),
    propertyType: belongsTo('fd-dev-type-definition', 'Тип свойства', {
      name: attr('', { hidden: true })
    })
  });
  modelClass.defineProjection('FormControlFullGet', 'fd-dev-form-control', {
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
  });
  modelClass.defineProjection('FormControlL', 'fd-dev-form-control', {
    name: attr('Имя'),
    controlType: belongsTo('fd-dev-control-type', '', {
      name: attr('Тип эдемента управления')
    }, { hidden: true }),
    order: attr('', { hidden: true }),
    propertyType: belongsTo('fd-dev-type-definition', '', {
      name: attr('Тип свойства')
    }, { hidden: true })
  });
};
