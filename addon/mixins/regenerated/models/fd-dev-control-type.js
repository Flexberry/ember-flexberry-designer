import Ember from 'ember';
import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';
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
    name: Projection.attr('Имя'),
    designerHtmlTemplate: Projection.attr('Шаблон'),
    designerMetadataXml: Projection.attr('Метаданные дизайна'),
    editedType: Projection.belongsTo('fd-dev-type-definition', '', {
      name: Projection.attr('', { hidden: true })
    })
  });
  modelClass.defineProjection('ControlTypeL', 'fd-dev-control-type', {
    name: Projection.attr(''),
    designerHtmlTemplate: Projection.attr(''),
    designerMetadataXml: Projection.attr(''),
    editedType: Projection.belongsTo('fd-dev-type-definition', '', {
      name: Projection.attr('')
    }, { hidden: true })
  });
  modelClass.defineProjection('ControlTypeXmlView', 'fd-dev-control-type', {
    designerMetadataXml: Projection.attr('')
  });
  modelClass.defineProjection('Full', 'fd-dev-control-type', {
    name: Projection.attr('Имя'),
    designerHtmlTemplate: Projection.attr('Шаблон'),
    designerMetadataXml: Projection.attr('Метаданные дизайна'),
    editedType: Projection.belongsTo('fd-dev-type-definition', '', {
      name: Projection.attr(''),
      caption: Projection.attr(''),
      mapTypeName: Projection.attr(''),
      mapTypeAssemblyName: Projection.attr(''),
      formatAttribute: Projection.attr('')
    })
  });
};
