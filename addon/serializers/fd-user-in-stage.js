import { Serializer as UserInStageSerializer } from
  '../mixins/regenerated/serializers/fd-user-in-stage';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(UserInStageSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
