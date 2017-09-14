import { Serializer as DevProcessStatusSerializer } from
  '../mixins/regenerated/serializers/fd-dev-process-status';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(DevProcessStatusSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
