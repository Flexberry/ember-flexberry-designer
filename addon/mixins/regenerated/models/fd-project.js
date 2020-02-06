import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  repository: DS.belongsTo('fd-repository', { inverse: 'projects', async: false }),
  configurations: DS.hasMany('fd-configuration', { inverse: 'project', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      repository: { presence: true }
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
  modelClass.defineProjection('PathSearchView', 'fd-project', {
    name: attr(''),
    repository: belongsTo('fd-repository', '', {
      name: attr('')
    })
  });
  modelClass.defineProjection('SearchRepObjView', 'fd-project', {
    name: attr('')
  });
  modelClass.defineProjection('LoadDataNode', 'fd-project', {
    name: attr(''),
    description: attr(''),
    repository: belongsTo('fd-repository', '', {

    })
  });
};
