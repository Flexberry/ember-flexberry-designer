import { Serializer as AuthTypeSerializer } from
  '../mixins/regenerated/serializers/fd-auth-type';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(AuthTypeSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
