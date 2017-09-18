import { Serializer as DevUMLDPDSerializer } from
  '../mixins/regenerated/serializers/fd-dev-uml-dpd';
import DPDSerializer from './fd-dpd';

export default DPDSerializer.extend(DevUMLDPDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
