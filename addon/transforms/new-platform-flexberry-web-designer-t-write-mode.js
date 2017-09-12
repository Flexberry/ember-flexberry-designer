import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import tWriteModeEnum from '../enums/new-platform-flexberry-web-designer-t-write-mode';

export default FlexberryEnum.extend({
  enum: tWriteModeEnum,
  sourceType: 'NewPlatform.Flexberry.WebDesigner.tWriteMode'
});
