import { Serializer as ViewSerializer } from
  '../mixins/regenerated/serializers/fd-view';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(ViewSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
