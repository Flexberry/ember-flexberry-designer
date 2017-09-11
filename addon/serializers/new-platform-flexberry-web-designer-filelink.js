import { Serializer as FilelinkSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-filelink';
import ObjectInSystemSerializer from './new-platform-flexberry-web-designer-object-in-system';

export default ObjectInSystemSerializer.extend(FilelinkSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
