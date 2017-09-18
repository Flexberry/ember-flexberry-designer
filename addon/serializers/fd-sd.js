import { Serializer as SDSerializer } from
  '../mixins/regenerated/serializers/fd-sd';
import DiagramSerializer from './fd-diagram';

export default DiagramSerializer.extend(SDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
