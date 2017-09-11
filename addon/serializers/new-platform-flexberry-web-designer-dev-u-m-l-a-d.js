import { Serializer as DevUMLADSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-u-m-l-a-d';
import ADSerializer from './new-platform-flexberry-web-designer-a-d';

export default ADSerializer.extend(DevUMLADSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
