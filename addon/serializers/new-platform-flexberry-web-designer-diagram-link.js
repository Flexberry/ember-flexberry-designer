import { Serializer as DiagramLinkSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-diagram-link';
import ObjectInSystemSerializer from './new-platform-flexberry-web-designer-object-in-system';

export default ObjectInSystemSerializer.extend(DiagramLinkSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
