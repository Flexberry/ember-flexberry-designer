import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  diagramPrimaryKey: DS.attr('string'),
  diagramType: DS.attr('string'),
  subsystem: DS.belongsTo('new-platform-flexberry-web-designer-subsystem', { inverse: 'diagramLinks', async: false, polymorphic: true }),
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
    _parentModelName: 'new-platform-flexberry-web-designer-object-in-system'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('DiagramLink', 'new-platform-flexberry-web-designer-diagram-link', {
    name: Projection.attr('Название'),
    description: Projection.attr('Описание')
  });
};
