import { Serializer as DevUMLSDSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-d';
import SDSerializer from './new-platform-flexberry-web-designer-s-d';

export default SDSerializer.extend(DevUMLSDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
