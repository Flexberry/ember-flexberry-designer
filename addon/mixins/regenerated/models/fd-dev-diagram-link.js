import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import { attr } from 'ember-flexberry-data/utils/attributes';
export let Model = Mixin.create({
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
    _parentModelName: 'fd-diagram-link'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('DiagramLink', 'fd-dev-diagram-link', {
    name: attr('Название'),
    description: attr('Описание')
  });
};
