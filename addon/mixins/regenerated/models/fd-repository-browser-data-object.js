import Ember from 'ember';
import DS from 'ember-data';
import { attr } from 'ember-flexberry-data/utils/attributes';
export let Model = Ember.Mixin.create({
  createUser: DS.attr('string'),
  createDate: DS.attr('date'),
  changeUser: DS.attr('string'),
  changeDate: DS.attr('date'),
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
    _parentModelName: 'fd-repository-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Browser', 'fd-repository-browser-data-object', {
    name: attr('Название'),
    description: attr('Описание'),
    changeUser: attr('Изменил'),
    changeDate: attr('Изменено'),
    createUser: attr('Создал'),
    createDate: attr('Создано')
  });
};
