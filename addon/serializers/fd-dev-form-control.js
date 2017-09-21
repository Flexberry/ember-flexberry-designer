import { Serializer as DevFormControlSerializer } from
  '../mixins/regenerated/serializers/fd-dev-form-control';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(DevFormControlSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
