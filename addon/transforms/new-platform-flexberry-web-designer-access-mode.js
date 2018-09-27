import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import AccessModeEnum from '../enums/new-platform-flexberry-web-designer-access-mode';

export default FlexberryEnum.extend({
  enum: AccessModeEnum,
  sourceType: 'NewPlatform.Flexberry.WebDesigner.AccessMode'
});
