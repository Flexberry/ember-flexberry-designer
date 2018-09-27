import { Serializer as FollowingSerializer } from
  '../mixins/regenerated/serializers/fd-following';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(FollowingSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
