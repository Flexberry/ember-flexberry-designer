import { Serializer as CODSerializer } from
  '../mixins/regenerated/serializers/fd-cod';
import DiagramSerializer from './fd-diagram';

export default DiagramSerializer.extend(CODSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
