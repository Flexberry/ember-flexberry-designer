import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import AccessModifierEnum from '../enums/new-platform-flexberry-web-designer-access-modifier';

export default FlexberryEnum.extend({
  enum: AccessModifierEnum,
  sourceType: 'NewPlatform.Flexberry.WebDesigner.AccessModifier'
});
