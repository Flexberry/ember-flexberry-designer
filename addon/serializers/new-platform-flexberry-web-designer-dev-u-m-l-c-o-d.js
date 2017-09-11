import { Serializer as DevUMLCODSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d';
import CODSerializer from './new-platform-flexberry-web-designer-c-o-d';

export default CODSerializer.extend(DevUMLCODSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
