import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  project: DS.belongsTo('fd-project', { inverse: 'configurations', async: false }),
  stages: DS.hasMany('fd-stage', { inverse: 'configuration', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      project: { presence: true }
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
  modelClass.defineProjection('PathSearchView', 'fd-configuration', {
    name: Projection.attr(''),
    project: Projection.belongsTo('fd-project', '', {
      name: Projection.attr(''),
      repository: Projection.belongsTo('fd-repository', '', {

      })
    })
  });
  modelClass.defineProjection('SearchRepObjView', 'fd-configuration', {
    name: Projection.attr('')
  });
  modelClass.defineProjection('TestStageName', 'fd-configuration', {
    name: Projection.attr('')
  });
};
