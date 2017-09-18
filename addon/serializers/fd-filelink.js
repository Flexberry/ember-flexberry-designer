import { Serializer as FilelinkSerializer } from
  '../mixins/regenerated/serializers/fd-filelink';
import ObjectInSystemSerializer from './fd-object-in-system';

export default ObjectInSystemSerializer.extend(FilelinkSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
