import { Serializer as DPDSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-d-p-d';
import DiagramSerializer from './new-platform-flexberry-web-designer-diagram';

export default DiagramSerializer.extend(DPDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
