import { Serializer as DevControlTypeSerializer } from
  '../mixins/regenerated/serializers/fd-dev-control-type';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(DevControlTypeSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
