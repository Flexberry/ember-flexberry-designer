import { Serializer as CADSerializer } from
  '../mixins/regenerated/serializers/fd-cad';
import DiagramSerializer from './fd-diagram';

export default DiagramSerializer.extend(CADSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
