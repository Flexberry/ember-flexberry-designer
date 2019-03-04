import Ember from 'ember';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
export let Model = Ember.Mixin.create({
  repository: DS.belongsTo('fd-repository', { inverse: 'projects', async: false }),
  configurations: DS.hasMany('fd-configuration', { inverse: 'project', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      repository: { presence: true }
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
    _parentModelName: 'fd-repository-object-with-plugins'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('PathSearchView', 'fd-project', {
    name: attr(''),
    repository: belongsTo('fd-repository', '', {
      name: attr('')
    })
  });
  modelClass.defineProjection('SearchRepObjView', 'fd-project', {
    name: attr('')
  });
};
