import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
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
    _parentModelName: 'new-platform-flexberry-web-designer-repository-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Browser', 'new-platform-flexberry-web-designer-repository-browser-data-object', {
    name: Projection.attr('Название'),
    description: Projection.attr('Описание'),
    changeUser: Projection.attr('Изменил'),
    changeDate: Projection.attr('Изменено'),
    createUser: Projection.attr('Создал'),
    createDate: Projection.attr('Создано')
  });
};
