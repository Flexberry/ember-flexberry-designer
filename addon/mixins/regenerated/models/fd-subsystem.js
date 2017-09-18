import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  stage: DS.belongsTo('fd-stage', { inverse: 'systems', async: false, polymorphic: true }),
  diagrams: DS.hasMany('fd-diagram', { inverse: 'subsystem', async: false }),
  diagramLinks: DS.hasMany('fd-diagram-link', { inverse: 'subsystem', async: false }),
  filelinks: DS.hasMany('fd-filelink', { inverse: 'subsystem', async: false }),
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
    _parentModelName: 'fd-repository-browser-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Convert', 'fd-subsystem', {
    createUser: Projection.attr('CreateUser'),
    createDate: Projection.attr('CreateDate'),
    changeUser: Projection.attr('ChangeUser'),
    changeDate: Projection.attr('ChangeDate'),
    name: Projection.attr('Name'),
    description: Projection.attr('Description'),
    nameStr: Projection.attr('NameStr'),
    diagramLinks: Projection.hasMany('fd-diagram-link', '', {
      name: Projection.attr('Название'),
      description: Projection.attr('Описание')
    }),
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
  modelClass.defineProjection('PathSearchView', 'fd-subsystem', {
    name: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {
      name: Projection.attr(''),
      configuration: Projection.belongsTo('fd-configuration', '', {
        name: Projection.attr(''),
        project: Projection.belongsTo('fd-project', '', {
          name: Projection.attr(''),
          repository: Projection.belongsTo('fd-repository', '', {
            name: Projection.attr('')
          })
        })
      })
    })
  });
  modelClass.defineProjection('SearchSystem', 'fd-subsystem', {
    name: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {
      name: Projection.attr('')
    })
  });
};
