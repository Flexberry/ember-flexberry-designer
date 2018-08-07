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
    _parentModelName: 'fd-inheritance'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Edit', 'fd-dev-inheritance', {
    name: Projection.attr('')
  });
  modelClass.defineProjection('EditFormView', 'fd-dev-inheritance', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description')
  });
  modelClass.defineProjection('EditPropertyLookups', 'fd-dev-inheritance', {
    parent: Projection.belongsTo('fd-class', '', {
      name: Projection.attr('')
    }, { hidden: true }),
    child: Projection.belongsTo('fd-class', '', {
      name: Projection.attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('FdPreloadMetadata', 'fd-dev-inheritance', {
    referenceCount: Projection.attr(''),
    name: Projection.attr(''),
    description: Projection.attr(''),
    nameStr: Projection.attr(''),
    stage: Projection.belongsTo('fd-stage', '', {
      name: Projection.attr('')
    }),
    child: Projection.belongsTo('fd-class', '', {
      name: Projection.attr('')
    }),
    parent: Projection.belongsTo('fd-class', '', {
      name: Projection.attr('')
    })
  });
  modelClass.defineProjection('Generator', 'fd-dev-inheritance', {
    referenceCount: Projection.attr('ReferenceCount', { hidden: true }),
    name: Projection.attr('Name', { hidden: true }),
    description: Projection.attr('Description', { hidden: true }),
    nameStr: Projection.attr('NameStr', { hidden: true }),
    child: Projection.belongsTo('fd-class', 'Child', {

    }, { hidden: true }),
    parent: Projection.belongsTo('fd-class', 'Parent', {

    }, { hidden: true })
  });
  modelClass.defineProjection('InhList', 'fd-dev-inheritance', {
    referenceCount: Projection.attr('Количество упоминаний'),
    parent: Projection.belongsTo('fd-class', 'Предок', {
      nameStr: Projection.attr('Предок')
    }, { hidden: true }),
    child: Projection.belongsTo('fd-class', 'Наследник', {
      nameStr: Projection.attr('Наследник')
    }, { hidden: true }),
    stage: Projection.belongsTo('fd-stage', '', {
      name: Projection.attr('', { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('ListDataObjectTypes', 'fd-dev-inheritance', {
    parent: Projection.belongsTo('fd-class', '', {
      name: Projection.attr('')
    }, { hidden: true }),
    child: Projection.belongsTo('fd-class', '', {
      name: Projection.attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('ListFormView', 'fd-dev-inheritance', {
    parent: Projection.belongsTo('fd-class', '', {
      name: Projection.attr('Parent')
    }, { hidden: true }),
    child: Projection.belongsTo('fd-class', '', {
      name: Projection.attr('Child')
    }, { hidden: true })
  });
};
