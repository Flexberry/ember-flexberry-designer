import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
export let Model = Mixin.create({
  project: DS.belongsTo('fd-project', { inverse: 'configurations', async: false }),
  stages: DS.hasMany('fd-stage', { inverse: 'configuration', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      project: { presence: true }
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
  modelClass.defineProjection('EditFormView', 'fd-configuration', {
    name: attr('Name'),
    description: attr('Description'),
    project: belongsTo('fd-project', '', {
      repository: belongsTo('fd-repository', '', {

      }, { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('ListFormView', 'fd-configuration', {
    name: attr('Name'),
    changeUser: attr('Change user'),
    changeDate: attr('Change date'),
    createUser: attr('Create user'),
    createDate: attr('Create date')
  });
  modelClass.defineProjection('PathSearchView', 'fd-configuration', {
    name: attr(''),
    project: belongsTo('fd-project', '', {
      name: attr(''),
      repository: belongsTo('fd-repository', '', {

      })
    })
  });
  modelClass.defineProjection('SearchRepObjView', 'fd-configuration', {
    name: attr('')
  });
  modelClass.defineProjection('TestStageName', 'fd-configuration', {
    name: attr('')
  });
  modelClass.defineProjection('LoadDataNode', 'fd-configuration', {
    name: attr(''),
    description: attr(''),
    project: belongsTo('fd-project', '', {

    })
  });
};
