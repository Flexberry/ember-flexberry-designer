import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';

export let Model = Mixin.create({
  name: DS.attr('string'),
  description: DS.attr('string'),
  ordernum: DS.attr('number'),
  dataObjectTypesStr: DS.attr('string'),
  propertyLookupStr: DS.attr('string'),
  listFormOperationsStr: DS.attr('string'),
  hierarchicalMaster: DS.attr('string'),
  view: DS.belongsTo('fd-view', { inverse: null, async: false }),
  formControl: DS.hasMany('fd-form-control', { inverse: 'formView', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      view: { presence: true }
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});
