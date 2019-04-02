import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';

export let Model = Mixin.create({
  valueXML: DS.attr('string'),
  moduleSettingTypeName: DS.attr('string'),
  moduleSettingType: DS.belongsTo('fd-dev-module-setting-type', { inverse: null, async: false }),
  stage: DS.belongsTo('fd-dev-stage', { inverse: 'moduleSettings', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      moduleSettingType: { presence: true },
      stage: { presence: true }
    };
    return $.extend(true, {}, parentValidations, thisValidations);
  },
  init: function () {
    this.set('validations', this.getValidations());
    this._super(...arguments);
  }
});

export let defineProjections = function (modelClass) {
  modelClass.defineProjection('Backup', 'fd-dev-module-setting', {
    valueXML: attr(''),
    moduleSettingTypeName: attr(''),
    moduleSettingType: belongsTo('fd-dev-module-setting-type', '', {

    }, { hidden: true }),
    stage: belongsTo('fd-dev-stage', '', {

    }, { hidden: true })
  });
  modelClass.defineProjection('ModuleSettingE', 'fd-dev-module-setting', {
    moduleSettingType: belongsTo('fd-dev-module-setting-type', 'ModuleSettingTyp', {
      name: attr('Name ModuleSettingType')
    }, { hidden: true }),
    valueXML: attr('ValueXML'),
    moduleSettingTypeName: attr(''),
    stage: belongsTo('fd-dev-stage', 'Stage', {

    }, { hidden: true })
  });
  modelClass.defineProjection('ModuleSettingL', 'fd-dev-module-setting', {
    moduleSettingType: belongsTo('fd-dev-module-setting-type', 'ModuleSettingType', {
      name: attr('Name ModuleSettingType')
    }, { hidden: true }),
    valueXML: attr('ValueXML'),
    moduleSettingTypeName: attr(''),
    stage: belongsTo('fd-dev-stage', 'Stage', {

    }, { hidden: true })
  });
};
