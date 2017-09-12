import { Serializer as DiagramSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-diagram';
import ObjectInSystemSerializer from './new-platform-flexberry-web-designer-object-in-system';

export default ObjectInSystemSerializer.extend(DiagramSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
