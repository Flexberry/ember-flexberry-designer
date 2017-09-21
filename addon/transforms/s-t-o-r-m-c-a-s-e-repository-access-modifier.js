import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import AccessModifierEnum from '../enums/s-t-o-r-m-c-a-s-e-repository-access-modifier';

export default FlexberryEnum.extend({
  enum: AccessModifierEnum,
  sourceType: 'NewPlatform.Flexberry.WebDesigner.AccessModifier'
});
