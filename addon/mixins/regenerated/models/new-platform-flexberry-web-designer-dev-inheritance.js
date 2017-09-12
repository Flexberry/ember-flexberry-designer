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
    _parentModelName: 'new-platform-flexberry-web-designer-inheritance'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Edit', 'new-platform-flexberry-web-designer-dev-inheritance', {
    name: Projection.attr('')
  });
  modelClass.defineProjection('EditFormView', 'new-platform-flexberry-web-designer-dev-inheritance', {
    name: Projection.attr('Name'),
    description: Projection.attr('Description')
  });
  modelClass.defineProjection('EditPropertyLookups', 'new-platform-flexberry-web-designer-dev-inheritance', {
    parent: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {
      name: Projection.attr('')
    }, { hidden: true }),
    child: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {
      name: Projection.attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('Generator', 'new-platform-flexberry-web-designer-dev-inheritance', {
    referenceCount: Projection.attr('ReferenceCount', { hidden: true }),
    name: Projection.attr('Name', { hidden: true }),
    description: Projection.attr('Description', { hidden: true }),
    nameStr: Projection.attr('NameStr', { hidden: true }),
    child: Projection.belongsTo('new-platform-flexberry-web-designer-class', 'Child', {

    }, { hidden: true }),
    parent: Projection.belongsTo('new-platform-flexberry-web-designer-class', 'Parent', {

    }, { hidden: true })
  });
  modelClass.defineProjection('InhList', 'new-platform-flexberry-web-designer-dev-inheritance', {
    referenceCount: Projection.attr('Количество упоминаний'),
    parent: Projection.belongsTo('new-platform-flexberry-web-designer-class', 'Предок', {
      nameStr: Projection.attr('Предок')
    }, { hidden: true }),
    child: Projection.belongsTo('new-platform-flexberry-web-designer-class', 'Наследник', {
      nameStr: Projection.attr('Наследник')
    }, { hidden: true }),
    stage: Projection.belongsTo('new-platform-flexberry-web-designer-stage', '', {
      name: Projection.attr('', { hidden: true })
    }, { hidden: true })
  });
  modelClass.defineProjection('ListDataObjectTypes', 'new-platform-flexberry-web-designer-dev-inheritance', {
    parent: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {
      name: Projection.attr('')
    }, { hidden: true }),
    child: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {
      name: Projection.attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('ListFormView', 'new-platform-flexberry-web-designer-dev-inheritance', {
    referenceCount: Projection.attr('Reference count'),
    parent: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {
      name: Projection.attr('Parent')
    }, { hidden: true }),
    child: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {
      name: Projection.attr('Child')
    }, { hidden: true })
  });
};
