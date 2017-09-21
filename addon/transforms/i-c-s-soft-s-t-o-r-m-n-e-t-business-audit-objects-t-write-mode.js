import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import tWriteModeEnum from '../enums/i-c-s-soft-s-t-o-r-m-n-e-t-business-audit-objects-t-write-mode';

export default FlexberryEnum.extend({
  enum: tWriteModeEnum,
  sourceType: 'NewPlatform.Flexberry.WebDesigner.tWriteMode'
});
