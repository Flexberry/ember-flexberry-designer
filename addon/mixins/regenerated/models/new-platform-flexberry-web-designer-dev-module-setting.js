import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
export let Model = Ember.Mixin.create({
  valueXML: DS.attr('string'),
  moduleSettingType: DS.belongsTo('new-platform-flexberry-web-designer-dev-module-setting-type', { inverse: null, async: false }),
  stage: DS.belongsTo('new-platform-flexberry-web-designer-dev-stage', { inverse: 'moduleSettings', async: false }),
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
  modelClass.defineProjection('ModuleSettingE', 'new-platform-flexberry-web-designer-dev-module-setting', {
    moduleSettingType: Projection.belongsTo('new-platform-flexberry-web-designer-dev-module-setting-type', 'ModuleSettingTyp', {
      name: Projection.attr('Name ModuleSettingType')
    }, { hidden: true }),
    valueXML: Projection.attr('ValueXML'),
    stage: Projection.belongsTo('new-platform-flexberry-web-designer-dev-stage', 'Stage', {

    }, { hidden: true })
  });
  modelClass.defineProjection('ModuleSettingL', 'new-platform-flexberry-web-designer-dev-module-setting', {
    moduleSettingType: Projection.belongsTo('new-platform-flexberry-web-designer-dev-module-setting-type', 'ModuleSettingType', {
      name: Projection.attr('Name ModuleSettingType')
    }, { hidden: true }),
    valueXML: Projection.attr('ValueXML'),
    stage: Projection.belongsTo('new-platform-flexberry-web-designer-dev-stage', 'Stage', {

    }, { hidden: true })
  });
};
