import { Serializer as DiagramSerializer } from
  '../mixins/regenerated/serializers/fd-diagram';
import ObjectInSystemSerializer from './fd-object-in-system';

export default ObjectInSystemSerializer.extend(DiagramSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
