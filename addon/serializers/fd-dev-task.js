import { Serializer as DevTaskSerializer } from
  '../mixins/regenerated/serializers/fd-dev-task';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(DevTaskSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
