import { Serializer as DevFilelinkSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-filelink';
import FilelinkSerializer from './new-platform-flexberry-web-designer-filelink';

export default FilelinkSerializer.extend(DevFilelinkSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
