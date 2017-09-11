import { Serializer as CODSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-c-o-d';
import DiagramSerializer from './new-platform-flexberry-web-designer-diagram';

export default DiagramSerializer.extend(CODSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
