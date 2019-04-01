import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';

export let Model = Mixin.create({
  user: DS.attr('string'),
  date: DS.attr('date'),
  stageName: DS.attr('string'),
  stage: DS.belongsTo('fd-dev-stage', { inverse: null, async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      stage: { presence: true }
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});

