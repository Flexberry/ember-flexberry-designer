import { Serializer as DevDiagramLinkSerializer } from
  '../mixins/regenerated/serializers/fd-dev-diagram-link';
import DiagramLinkSerializer from './fd-diagram-link';

export default DiagramLinkSerializer.extend(DevDiagramLinkSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
