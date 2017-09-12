import { Serializer as DevUMLDPDSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d';
import DPDSerializer from './new-platform-flexberry-web-designer-d-p-d';

export default DPDSerializer.extend(DevUMLDPDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
