import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  settings: DS.attr('string'),
  plugin: DS.belongsTo('fd-registered-plug-in', { inverse: null, async: false }),
  plugOutObject: DS.belongsTo('fd-repository-object-with-plugins', { inverse: 'plugins', async: false, polymorphic: true }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      plugin: { presence: true },
      plugOutObject: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('DetailEditView', 'fd-plugin-on-rep-object', {
    plugin: Projection.belongsTo('fd-registered-plug-in', 'Модуль', {
      storedType: Projection.attr('Тип')
    }, { displayMemberPath: 'name' }),
    settings: Projection.attr('', { hidden: true })
  });
};
