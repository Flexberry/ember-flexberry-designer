import { Serializer as DevUMLUCDSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d';
import UCDSerializer from './new-platform-flexberry-web-designer-u-c-d';

export default UCDSerializer.extend(DevUMLUCDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
