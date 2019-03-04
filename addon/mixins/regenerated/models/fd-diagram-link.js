import Ember from 'ember';
import DS from 'ember-data';
import { attr } from 'ember-flexberry-data/utils/attributes';
export let Model = Ember.Mixin.create({
  diagramPrimaryKey: DS.attr('string'),
  diagramType: DS.attr('string'),
  subsystem: DS.belongsTo('fd-subsystem', { inverse: 'diagramLinks', async: false, polymorphic: true }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      subsystem: { presence: true }
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
    _parentModelName: 'fd-object-in-system'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('DiagramLink', 'fd-diagram-link', {
    name: attr('Название'),
    description: attr('Описание')
  });
};
