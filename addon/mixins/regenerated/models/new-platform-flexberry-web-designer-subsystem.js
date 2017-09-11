import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  stage: DS.belongsTo('new-platform-flexberry-web-designer-stage', { inverse: 'systems', async: false, polymorphic: true }),
  diagrams: DS.hasMany('new-platform-flexberry-web-designer-diagram', { inverse: 'subsystem', async: false }),
  diagramLinks: DS.hasMany('new-platform-flexberry-web-designer-diagram-link', { inverse: 'subsystem', async: false }),
  filelinks: DS.hasMany('new-platform-flexberry-web-designer-filelink', { inverse: 'subsystem', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      stage: { presence: true }
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
    _parentModelName: 'new-platform-flexberry-web-designer-repository-browser-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Convert', 'new-platform-flexberry-web-designer-subsystem', {
    createUser: Projection.attr('CreateUser'),
    createDate: Projection.attr('CreateDate'),
    changeUser: Projection.attr('ChangeUser'),
    changeDate: Projection.attr('ChangeDate'),
    name: Projection.attr('Name'),
    description: Projection.attr('Description'),
    nameStr: Projection.attr('NameStr'),
    diagramLinks: Projection.hasMany('new-platform-flexberry-web-designer-diagram-link', '', {
      name: Projection.attr('Название'),
      description: Projection.attr('Описание')
    }),
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
  modelClass.defineProjection('PathSearchView', 'new-platform-flexberry-web-designer-subsystem', {
    name: Projection.attr(''),
    stage: Projection.belongsTo('new-platform-flexberry-web-designer-stage', '', {
      name: Projection.attr(''),
      configuration: Projection.belongsTo('new-platform-flexberry-web-designer-configuration', '', {
        name: Projection.attr(''),
        project: Projection.belongsTo('new-platform-flexberry-web-designer-project', '', {
          name: Projection.attr(''),
          repository: Projection.belongsTo('new-platform-flexberry-web-designer-repository', '', {
            name: Projection.attr('')
          })
        })
      })
    })
  });
  modelClass.defineProjection('SearchSystem', 'new-platform-flexberry-web-designer-subsystem', {
    name: Projection.attr(''),
    stage: Projection.belongsTo('new-platform-flexberry-web-designer-stage', '', {
      name: Projection.attr('')
    })
  });
};
