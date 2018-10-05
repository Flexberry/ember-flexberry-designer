import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  shortName: DS.attr('string'),
  dataServiceFullTypeName: DS.attr('string'),
  actual: DS.attr('boolean', { defaultValue: true }),
  stage: DS.belongsTo('fd-dev-stage', { inverse: null, async: false }),
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

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('EditFormView', 'fd-storage-type', {
    shortName: Projection.attr('ShortName', { hidden: true }),
    dataServiceFullTypeName: Projection.attr('DataServiceFullTypeName', { hidden: true }),
    actual: Projection.attr('Actual', { hidden: true }),
    stage: Projection.belongsTo('fd-dev-stage', '', {

    })
  });
  modelClass.defineProjection('ListFormView', 'fd-storage-type', {
    shortName: Projection.attr(''),
    dataServiceFullTypeName: Projection.attr(''),
    actual: Projection.attr(''),
    stage: Projection.belongsTo('fd-dev-stage', '', {
      name: Projection.attr('')
    }, { hidden: true })
  });
};
