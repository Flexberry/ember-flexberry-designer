import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
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
    _parentModelName: 'fd-diagram-link'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('DiagramLink', 'fd-dev-diagram-link', {
    name: Projection.attr('Название'),
    description: Projection.attr('Описание')
  });
};
