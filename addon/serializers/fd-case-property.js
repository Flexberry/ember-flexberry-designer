import { Serializer as CasePropertySerializer } from
  '../mixins/regenerated/serializers/fd-case-property';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(CasePropertySerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
