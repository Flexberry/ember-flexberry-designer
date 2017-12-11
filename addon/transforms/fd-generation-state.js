import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import GenerationStateEnum from '../enums/fd-generation-state';

export default FlexberryEnum.extend({
  enum: GenerationStateEnum,
  sourceType: 'NewPlatform.Flexberry.WebDesigner.GenerationState'
});
