import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  project: DS.belongsTo('new-platform-flexberry-web-designer-project', { inverse: 'configurations', async: false }),
  stages: DS.hasMany('new-platform-flexberry-web-designer-stage', { inverse: 'configuration', async: false }),
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
    _parentModelName: 'new-platform-flexberry-web-designer-repository-object-with-plugins'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('PathSearchView', 'new-platform-flexberry-web-designer-configuration', {
    name: Projection.attr(''),
    project: Projection.belongsTo('new-platform-flexberry-web-designer-project', '', {
      name: Projection.attr(''),
      repository: Projection.belongsTo('new-platform-flexberry-web-designer-repository', '', {

      })
    })
  });
  modelClass.defineProjection('SearchRepObjView', 'new-platform-flexberry-web-designer-configuration', {
    name: Projection.attr('')
  });
  modelClass.defineProjection('TestStageName', 'new-platform-flexberry-web-designer-configuration', {
    name: Projection.attr('')
  });
};
