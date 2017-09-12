import { Serializer as CADSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-c-a-d';
import DiagramSerializer from './new-platform-flexberry-web-designer-diagram';

export default DiagramSerializer.extend(CADSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
