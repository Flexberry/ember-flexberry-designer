import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  time: DS.attr('date', { defaultValue() { return new Date(); } }),
  text: DS.attr('string'),
  thisIsError: DS.attr('boolean'),
  isWarn: DS.attr('boolean'),
  generation: DS.belongsTo('fd-generation', { inverse: 'stepLogs', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      generation: { presence: true }
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('ListFormView', 'fd-generation-step-log', {
    time: attr(''),
    thisIsError: attr(''),
    isWarn: attr(''),
    text: attr('')
  });
};
