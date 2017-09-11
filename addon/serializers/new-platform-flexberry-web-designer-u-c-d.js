import { Serializer as UCDSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-u-c-d';
import DiagramSerializer from './new-platform-flexberry-web-designer-diagram';

export default DiagramSerializer.extend(UCDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
