import Ember from 'ember';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
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
    shortName: attr('ShortName', { hidden: true }),
    dataServiceFullTypeName: attr('DataServiceFullTypeName', { hidden: true }),
    actual: attr('Actual', { hidden: true }),
    stage: belongsTo('fd-dev-stage', '', {

    })
  });
  modelClass.defineProjection('ListFormView', 'fd-storage-type', {
    shortName: attr(''),
    dataServiceFullTypeName: attr(''),
    actual: attr(''),
    stage: belongsTo('fd-dev-stage', '', {
      name: attr('')
    }, { hidden: true })
  });
};
