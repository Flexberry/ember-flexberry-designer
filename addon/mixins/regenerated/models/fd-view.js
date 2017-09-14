import Ember from 'ember';
import DS from 'ember-data';

export let Model = Ember.Mixin.create({
  name: DS.attr('string'),
  description: DS.attr('string'),
  definition: DS.attr('string'),
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
