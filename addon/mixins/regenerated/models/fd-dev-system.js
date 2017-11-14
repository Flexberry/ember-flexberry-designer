import Ember from 'ember';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
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
    _parentModelName: 'fd-subsystem'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Backup', 'fd-dev-system', {
    createUser: Projection.attr('CreateUser', { hidden: true }),
    createDate: Projection.attr('CreateDate', { hidden: true }),
    changeUser: Projection.attr('ChangeUser', { hidden: true }),
    changeDate: Projection.attr('ChangeDate', { hidden: true }),
    name: Projection.attr('Name', { hidden: true }),
    description: Projection.attr('Description', { hidden: true }),
    nameStr: Projection.attr('NameStr', { hidden: true }),
    diagrams: Projection.hasMany('fd-diagram', '', {
      primitivesStreamString: Projection.attr(''),
      caseObjectsString: Projection.attr(''),
      name: Projection.attr(''),
      createDate: Projection.attr(''),
      createUser: Projection.attr(''),
      changeDate: Projection.attr(''),
      changeUser: Projection.attr('')
    }),
    filelinks: Projection.hasMany('fd-filelink', '', {
      name: Projection.attr('Название'),
      description: Projection.attr('Описание')
    })
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-system', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description')
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-system', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description'),
    changeUser: Projection.attr('Change user'),
    changeDate: Projection.attr('Change date'),
    createUser: Projection.attr('Create user'),
    createDate: Projection.attr('Create date')
  });
  modelClass.defineProjection('SearchSystem', 'fd-dev-system', {
    name: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {
      name: Projection.attr('')
    }),
    diagrams: Projection.hasMany('fd-diagram', '', {
      name: Projection.attr('')
    })
  });
  modelClass.defineProjection('FdDevSystem', 'fd-dev-system', {
    name: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {

    }),
    diagrams: Projection.hasMany('fd-diagram', '', {
      primitivesJsonString: Projection.attr(''),
      primitivesStreamString: Projection.attr(''),
      caseObjectsString: Projection.attr(''),
      name: Projection.attr('')
    })
  });
};
