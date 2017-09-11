import { Serializer as DevClassSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-class';
import ClassSerializer from './new-platform-flexberry-web-designer-class';

export default ClassSerializer.extend(DevClassSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
