import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  child: DS.belongsTo('fd-class', { inverse: null, async: false, polymorphic: true }),
  parent: DS.belongsTo('fd-class', { inverse: null, async: false, polymorphic: true }),
  stage: DS.belongsTo('fd-stage', { inverse: 'inheritances', async: false, polymorphic: true }),
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
    _parentModelName: 'fd-repository-ref-data-object'
  });
};

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Import', 'fd-inheritance', {
    referenceCount: Projection.attr(''),
    name: Projection.attr(''),
    parent: Projection.belongsTo('fd-class', '', {

    }),
    child: Projection.belongsTo('fd-class', '', {

    })
  });
  modelClass.defineProjection('References', 'fd-inheritance', {
    referenceCount: Projection.attr('')
  });
};
