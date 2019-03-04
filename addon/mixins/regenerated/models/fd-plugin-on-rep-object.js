import Ember from 'ember';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
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
    plugin: belongsTo('fd-registered-plug-in', 'Модуль', {
      storedType: attr('Тип')
    }, { displayMemberPath: 'name' }),
    settings: attr('', { hidden: true })
  });
};
