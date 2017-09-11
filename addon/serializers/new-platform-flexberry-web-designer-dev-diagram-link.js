import { Serializer as DevDiagramLinkSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-diagram-link';
import DiagramLinkSerializer from './new-platform-flexberry-web-designer-diagram-link';

export default DiagramLinkSerializer.extend(DevDiagramLinkSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
