import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  valueXML: DS.attr('string'),
  moduleSettingType: DS.belongsTo('fd-dev-module-setting-type', { inverse: null, async: false }),
  stage: DS.belongsTo('fd-dev-stage', { inverse: 'moduleSettings', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      moduleSettingType: { presence: true },
      stage: { presence: true }
    };
    return Ember.$.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super.apply(this, arguments);
  }
});
export let defineProjections = function (modelClass) {
  modelClass.defineProjection('ModuleSettingE', 'fd-dev-module-setting', {
    moduleSettingType: Projection.belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
      name: Projection.attr('Name ModuleSettingType')
    }, { hidden: true }),
    valueXML: Projection.attr('ValueXML'),
    stage: Projection.belongsTo('fd-dev-stage', 'Stage', {

    }, { hidden: true })
  });
  modelClass.defineProjection('ModuleSettingL', 'fd-dev-module-setting', {
    moduleSettingType: Projection.belongsTo('fd-dev-module-setting-type', 'ModuleSettingType', {
      name: Projection.attr('Name ModuleSettingType')
    }, { hidden: true }),
    valueXML: Projection.attr('ValueXML'),
    stage: Projection.belongsTo('fd-dev-stage', 'Stage', {

    }, { hidden: true })
  });
};
