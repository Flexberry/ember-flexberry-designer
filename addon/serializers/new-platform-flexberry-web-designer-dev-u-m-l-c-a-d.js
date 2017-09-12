import { Serializer as DevUMLCADSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d';
import CADSerializer from './new-platform-flexberry-web-designer-c-a-d';

export default CADSerializer.extend(DevUMLCADSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
