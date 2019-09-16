import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  projects: DS.hasMany('fd-project', { inverse: 'repository', async: false }),
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
    _parentModelName: 'fd-repository-object-with-plugins'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('PathSearchView', 'fd-repository', {
    name: attr('')
  });
  modelClass.defineProjection('SearchRepObjView', 'fd-repository', {
    name: attr('')
  });
  modelClass.defineProjection('Test', 'fd-repository', {
    name: attr('')
  });
  modelClass.defineProjection('LoadDataNode', 'fd-repository', {
    name: attr(''),
    description: attr('')
  });
};
