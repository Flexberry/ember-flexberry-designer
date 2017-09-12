import { Serializer as SDSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-s-d';
import DiagramSerializer from './new-platform-flexberry-web-designer-diagram';

export default DiagramSerializer.extend(SDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
