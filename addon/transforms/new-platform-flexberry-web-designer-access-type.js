import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import AccessTypeEnum from '../enums/new-platform-flexberry-web-designer-access-type';

export default FlexberryEnum.extend({
  enum: AccessTypeEnum,
  sourceType: 'NewPlatform.Flexberry.WebDesigner.AccessType'
});
