import { Serializer as DevStageSerializer } from
  '../mixins/regenerated/serializers/fd-dev-stage';
import StageSerializer from './fd-stage';

export default StageSerializer.extend(DevStageSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
