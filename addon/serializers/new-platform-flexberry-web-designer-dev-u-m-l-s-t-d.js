import { Serializer as DevUMLSTDSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d';
import STDSerializer from './new-platform-flexberry-web-designer-s-t-d';

export default STDSerializer.extend(DevUMLSTDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
