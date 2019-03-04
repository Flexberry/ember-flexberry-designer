import Ember from 'ember';
import DS from 'ember-data';
import { attr, belongsTo, hasMany } from 'ember-flexberry-data/utils/attributes';
export let Model = Ember.Mixin.create({
  plugins: DS.hasMany('fd-plugin-on-rep-object', { inverse: 'plugOutObject', async: false }),
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
    _parentModelName: 'fd-repository-browser-data-object-with-a-c-l'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Edit', 'fd-repository-object-with-plugins', {
    name: attr(''),
    description: attr(''),
    aCL: attr(''),
    plugins: hasMany('fd-plugin-on-rep-object', '', {
      plugin: belongsTo('fd-registered-plug-in', 'Модуль', {
        storedType: attr('Тип')
      }, { displayMemberPath: 'name' }),
      settings: attr('', { hidden: true })
    })
  });
  modelClass.defineProjection('PluginsOnly', 'fd-repository-object-with-plugins', {
    plugins: hasMany('fd-plugin-on-rep-object', '', {
      plugin: belongsTo('fd-registered-plug-in', 'Модуль', {
        storedType: attr('Тип')
      }, { displayMemberPath: 'name' }),
      settings: attr('', { hidden: true })
    })
  });
};
