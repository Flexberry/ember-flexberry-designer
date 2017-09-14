import Ember from 'ember';
import DS from 'ember-data';

export let Model = Ember.Mixin.create({
  message: DS.attr('string'),
  error: DS.attr('string'),
  completionPercent: DS.attr('number'),
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
