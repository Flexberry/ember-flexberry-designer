import Ember from 'ember';
import DS from 'ember-data';

export let Model = Ember.Mixin.create({
  helpKeyword: DS.attr('string'),
  name: DS.attr('string'),
  primitives: DS.attr('string'),
  primitiveTypes: DS.attr('string'),
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
export let defineBaseModel = function (modelClass) {
  modelClass.reopenClass({
    _parentModelName: 'fd-diagram'
  });
};
