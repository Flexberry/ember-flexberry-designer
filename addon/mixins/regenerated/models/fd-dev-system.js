import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import { attr, belongsTo, hasMany } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
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
    _parentModelName: 'fd-subsystem'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Backup', 'fd-dev-system', {
    createUser: attr('CreateUser', { hidden: true }),
    createDate: attr('CreateDate', { hidden: true }),
    changeUser: attr('ChangeUser', { hidden: true }),
    changeDate: attr('ChangeDate', { hidden: true }),
    name: attr('Name', { hidden: true }),
    description: attr('Description', { hidden: true }),
    nameStr: attr('NameStr', { hidden: true }),
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
  modelClass.defineProjection('EditFormView', 'fd-dev-system', {
    name: attr('Name'),
    description: attr('Description')
  });
  modelClass.defineProjection('FdDevSystem', 'fd-dev-system', {
    name: attr(''),
    stage: belongsTo('fd-stage', '', {

    }),
    diagrams: hasMany('fd-diagram', '', {
      name: attr(''),
      caseObjectsString: attr(''),
      primitivesStreamString: attr(''),
      primitivesJsonString: attr('')
    })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-system', {
    name: attr(''),
    stage: belongsTo('fd-stage', '', {

    }),
    diagrams: hasMany('fd-diagram', '', {
      primitivesJsonString: attr(''),
      primitivesStreamString: attr(''),
      caseObjectsString: attr(''),
      name: attr(''),
      changeDate: attr('')
    })
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-system', {
    name: attr('Name'),
    description: attr('Description'),
    changeUser: attr('Change user'),
    changeDate: attr('Change date'),
    createUser: attr('Create user'),
    createDate: attr('Create date')
  });
  modelClass.defineProjection('SearchSystem', 'fd-dev-system', {
    name: attr(''),
    stage: belongsTo('fd-stage', '', {
      name: attr('')
    }),
    diagrams: hasMany('fd-diagram', '', {
      name: attr('')
    })
  });
};
