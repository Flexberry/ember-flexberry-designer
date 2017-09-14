import { Serializer as DevFilelinkSerializer } from
  '../mixins/regenerated/serializers/fd-dev-filelink';
import FilelinkSerializer from './fd-filelink';

export default FilelinkSerializer.extend(DevFilelinkSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
