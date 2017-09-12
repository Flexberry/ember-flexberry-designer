import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  aCL: DS.attr('string'),
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
    _parentModelName: 'new-platform-flexberry-web-designer-repository-browser-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Properties', 'new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l', {
    name: Projection.attr('Название'),
    description: Projection.attr('Описание'),
    aCL: Projection.attr('Доступ')
  });
};
