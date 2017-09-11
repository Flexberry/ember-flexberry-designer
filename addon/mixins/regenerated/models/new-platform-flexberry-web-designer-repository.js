import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  projects: DS.hasMany('new-platform-flexberry-web-designer-project', { inverse: 'repository', async: false }),
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
    _parentModelName: 'new-platform-flexberry-web-designer-repository-object-with-plugins'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('PathSearchView', 'new-platform-flexberry-web-designer-repository', {
    name: Projection.attr('')
  });
  modelClass.defineProjection('SearchRepObjView', 'new-platform-flexberry-web-designer-repository', {
    name: Projection.attr('')
  });
  modelClass.defineProjection('Test', 'new-platform-flexberry-web-designer-repository', {
    name: Projection.attr('')
  });
};
