import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';

export let Model = Mixin.create({
  name: DS.attr('string'),
  order: DS.attr('number'),
  propertyPath: DS.attr('string'),
  settingsXml: DS.attr('string'),
  formView: DS.belongsTo('fd-form-view', { inverse: 'formControl', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      formView: { presence: true }
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});
