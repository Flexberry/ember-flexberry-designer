import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import AccessTypeEnum from '../enums/i-c-s-soft-s-t-o-r-m-n-e-t-access-type';

export default FlexberryEnum.extend({
  enum: AccessTypeEnum,
  sourceType: 'NewPlatform.Flexberry.WebDesigner.AccessType'
});
