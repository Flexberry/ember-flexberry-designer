import { Serializer as UserAuthProfileSerializer } from
  '../mixins/regenerated/serializers/fd-user-auth-profile';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(UserAuthProfileSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
