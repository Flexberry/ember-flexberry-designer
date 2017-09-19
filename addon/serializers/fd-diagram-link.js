import { Serializer as DiagramLinkSerializer } from
  '../mixins/regenerated/serializers/fd-diagram-link';
import ObjectInSystemSerializer from './fd-object-in-system';

export default ObjectInSystemSerializer.extend(DiagramLinkSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
