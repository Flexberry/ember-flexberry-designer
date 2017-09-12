import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  child: DS.belongsTo('new-platform-flexberry-web-designer-class', { inverse: null, async: false, polymorphic: true }),
  parent: DS.belongsTo('new-platform-flexberry-web-designer-class', { inverse: null, async: false, polymorphic: true }),
  stage: DS.belongsTo('new-platform-flexberry-web-designer-stage', { inverse: 'inheritances', async: false, polymorphic: true }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      child: { presence: true },
      parent: { presence: true },
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
    _parentModelName: 'new-platform-flexberry-web-designer-repository-ref-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Import', 'new-platform-flexberry-web-designer-inheritance', {
    referenceCount: Projection.attr(''),
    name: Projection.attr(''),
    parent: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {

    }),
    child: Projection.belongsTo('new-platform-flexberry-web-designer-class', '', {

    })
  });
  modelClass.defineProjection('References', 'new-platform-flexberry-web-designer-inheritance', {
    referenceCount: Projection.attr('')
  });
};
