import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  aCL: DS.attr('string'),
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
    _parentModelName: 'fd-repository-browser-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Properties', 'fd-repository-browser-data-object-with-a-c-l', {
    name: attr('Название'),
    description: attr('Описание'),
    aCL: attr('Доступ')
  });
};
