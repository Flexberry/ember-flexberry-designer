import Ember from 'ember';
import DS from 'ember-data';
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
    _parentModelName: 'new-platform-flexberry-web-designer-subsystem'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Backup', 'new-platform-flexberry-web-designer-dev-system', {
    createUser: Projection.attr('CreateUser', { hidden: true }),
    createDate: Projection.attr('CreateDate', { hidden: true }),
    changeUser: Projection.attr('ChangeUser', { hidden: true }),
    changeDate: Projection.attr('ChangeDate', { hidden: true }),
    name: Projection.attr('Name', { hidden: true }),
    description: Projection.attr('Description', { hidden: true }),
    nameStr: Projection.attr('NameStr', { hidden: true }),
    diagrams: Projection.hasMany('new-platform-flexberry-web-designer-diagram', '', {
      primitivesStreamString: Projection.attr(''),
      caseObjectsString: Projection.attr(''),
      name: Projection.attr(''),
      createDate: Projection.attr(''),
      createUser: Projection.attr(''),
      changeDate: Projection.attr(''),
      changeUser: Projection.attr('')
    }),
    filelinks: Projection.hasMany('new-platform-flexberry-web-designer-filelink', '', {
      name: Projection.attr('Название'),
      description: Projection.attr('Описание')
    })
  });
  modelClass.defineProjection('EditFormView', 'new-platform-flexberry-web-designer-dev-system', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description')
  });
  modelClass.defineProjection('ListFormView', 'new-platform-flexberry-web-designer-dev-system', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description'),
    changeUser: Projection.attr('Change user'),
    changeDate: Projection.attr('Change date'),
    createUser: Projection.attr('Create user'),
    createDate: Projection.attr('Create date')
  });
  modelClass.defineProjection('SearchSystem', 'new-platform-flexberry-web-designer-dev-system', {
    name: Projection.attr(''),
    stage: Projection.belongsTo('new-platform-flexberry-web-designer-stage', '', {
      name: Projection.attr('')
    }),
    diagrams: Projection.hasMany('new-platform-flexberry-web-designer-diagram', '', {
      name: Projection.attr('')
    })
  });
};
