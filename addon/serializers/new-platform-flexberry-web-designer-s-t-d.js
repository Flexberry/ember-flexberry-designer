import { Serializer as STDSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-s-t-d';
import DiagramSerializer from './new-platform-flexberry-web-designer-diagram';

export default DiagramSerializer.extend(STDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
