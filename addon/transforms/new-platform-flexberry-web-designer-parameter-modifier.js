import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import ParameterModifierEnum from '../enums/new-platform-flexberry-web-designer-parameter-modifier';

export default FlexberryEnum.extend({
  enum: ParameterModifierEnum,
  sourceType: 'NewPlatform.Flexberry.WebDesigner.ParameterModifier'
});
