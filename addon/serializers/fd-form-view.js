import { Serializer as FormViewSerializer } from
  '../mixins/regenerated/serializers/fd-form-view';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(FormViewSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
