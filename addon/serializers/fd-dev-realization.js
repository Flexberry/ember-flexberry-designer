import { Serializer as DevRealizationSerializer } from
  '../mixins/regenerated/serializers/fd-dev-realization';
import RealizationSerializer from './fd-realization';

export default RealizationSerializer.extend(DevRealizationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
