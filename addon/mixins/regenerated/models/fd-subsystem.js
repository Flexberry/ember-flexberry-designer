import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo, hasMany } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  stage: DS.belongsTo('fd-stage', { inverse: 'systems', async: false, polymorphic: true }),
  diagrams: DS.hasMany('fd-diagram', { inverse: 'subsystem', async: false, polymorphic: true }),
  diagramLinks: DS.hasMany('fd-diagram-link', { inverse: 'subsystem', async: false }),
  filelinks: DS.hasMany('fd-filelink', { inverse: 'subsystem', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      stage: { presence: true }
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
    _parentModelName: 'fd-repository-browser-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Convert', 'fd-subsystem', {
    createUser: attr('CreateUser'),
    createDate: attr('CreateDate'),
    changeUser: attr('ChangeUser'),
    changeDate: attr('ChangeDate'),
    name: attr('Name'),
    description: attr('Description'),
    nameStr: attr('NameStr'),
    diagramLinks: hasMany('fd-diagram-link', '', {
      name: attr('Название'),
      description: attr('Описание')
    }),
    diagrams: hasMany('fd-diagram', '', {
      primitivesStreamString: attr(''),
      caseObjectsString: attr(''),
      name: attr(''),
      createDate: attr(''),
      createUser: attr(''),
      changeDate: attr(''),
      changeUser: attr('')
    }),
    filelinks: hasMany('fd-filelink', '', {
      name: attr('Название'),
      description: attr('Описание')
    })
  });
  modelClass.defineProjection('PathSearchView', 'fd-subsystem', {
    name: attr(''),
    stage: belongsTo('fd-stage', '', {
      name: attr(''),
      configuration: belongsTo('fd-configuration', '', {
        name: attr(''),
        project: belongsTo('fd-project', '', {
          name: attr(''),
          repository: belongsTo('fd-repository', '', {
            name: attr('')
          })
        })
      })
    })
  });
  modelClass.defineProjection('SearchSystem', 'fd-subsystem', {
    name: attr(''),
    stage: belongsTo('fd-stage', '', {
      name: attr('')
    })
  });
};
