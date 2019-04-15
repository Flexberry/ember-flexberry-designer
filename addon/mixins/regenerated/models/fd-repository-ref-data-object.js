import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';

export let Model = Mixin.create({
  referenceCount: DS.attr('number'),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});
export let defineBaseModel = function (modelClass) {
  modelClass.reopenClass({
    _parentModelName: 'fd-repository-data-object'
  });
};

