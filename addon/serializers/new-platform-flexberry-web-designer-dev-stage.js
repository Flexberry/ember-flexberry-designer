import { Serializer as DevStageSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-stage';
import StageSerializer from './new-platform-flexberry-web-designer-stage';

export default StageSerializer.extend(DevStageSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
