import Ember from 'ember';
import DS from 'ember-data';

export let Model = Ember.Mixin.create({
  user: DS.attr('string'),
  date: DS.attr('string'),
  stageName: DS.attr('string'),
  stage: DS.belongsTo('fd-dev-stage', { inverse: null, async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      stage: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
