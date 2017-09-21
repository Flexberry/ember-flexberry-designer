import Ember from 'ember';
import DS from 'ember-data';

export let Model = Ember.Mixin.create({
  methodName: DS.attr('string'),
  settingsStr: DS.attr('string'),
  stagePrimaryKeyStr: DS.attr('string'),
  typeName: DS.attr('string'),
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
