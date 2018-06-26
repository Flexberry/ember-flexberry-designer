import FlexberryEnum from 'ember-flexberry-data/transforms/flexberry-enum';
import DataServiceObjectEventsEnum from '../enums/i-c-s-soft-s-t-o-r-m-n-e-t-business-data-service-object-events';

export default FlexberryEnum.extend({
  enum: DataServiceObjectEventsEnum,
  sourceType: 'NewPlatform.Flexberry.WebDesigner.DataServiceObjectEvents'
});
