import Ember from 'ember';
import DS from 'ember-data';
import { attr, belongsTo } from 'ember-flexberry-data/utils/attributes';
export let Model = Ember.Mixin.create({
  designerHtmlTemplate: DS.attr('string'),
  designerMetadataXml: DS.attr('string'),
  name: DS.attr('string'),
  editedType: DS.belongsTo('fd-dev-type-definition', { inverse: null, async: false }),
  stage: DS.belongsTo('fd-dev-stage', { inverse: 'controlTypes', async: false }),
  getValidations: function () {
    let parentValidations = this._super();
    let thisValidations = {
      name: { presence: true },
      editedType: { presence: true },
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
  modelClass.defineProjection('ControlTypeE', 'fd-dev-control-type', {
    name: attr('Имя'),
    designerHtmlTemplate: attr('Шаблон'),
    designerMetadataXml: attr('Метаданные дизайна'),
    editedType: belongsTo('fd-dev-type-definition', '', {
      name: attr('', { hidden: true })
    })
  });
  modelClass.defineProjection('ControlTypeL', 'fd-dev-control-type', {
    name: attr(''),
    designerHtmlTemplate: attr(''),
    designerMetadataXml: attr(''),
    editedType: belongsTo('fd-dev-type-definition', '', {
      name: attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('ControlTypeXmlView', 'fd-dev-control-type', {
    designerMetadataXml: attr('')
  });
  modelClass.defineProjection('Full', 'fd-dev-control-type', {
    name: attr('Имя'),
    designerHtmlTemplate: attr('Шаблон'),
    designerMetadataXml: attr('Метаданные дизайна'),
    editedType: belongsTo('fd-dev-type-definition', '', {
      name: attr(''),
      caption: attr(''),
      mapTypeName: attr(''),
      mapTypeAssemblyName: attr(''),
      formatAttribute: attr('')
    })
  });
};
