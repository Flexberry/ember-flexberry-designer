import Ember from 'ember';
import DS from 'ember-data';

export let Model = Ember.Mixin.create({
  name: DS.attr('string'),
  description: DS.attr('string'),
  ordernum: DS.attr('number'),
  dataObjectTypesStr: DS.attr('string'),
  propertyLookupStr: DS.attr('string'),
  listFormOperationsStr: DS.attr('string'),
  hierarchicalMaster: DS.attr('string'),
  view: DS.belongsTo('new-platform-flexberry-web-designer-view', { inverse: null, async: false }),
  formControl: DS.hasMany('new-platform-flexberry-web-designer-form-control', { inverse: 'formView', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      view: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
