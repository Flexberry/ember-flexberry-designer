import { Serializer as FormControlSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-form-control';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(FormControlSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
