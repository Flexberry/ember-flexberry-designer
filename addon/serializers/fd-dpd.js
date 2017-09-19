import { Serializer as DPDSerializer } from
  '../mixins/regenerated/serializers/fd-dpd';
import DiagramSerializer from './fd-diagram';

export default DiagramSerializer.extend(DPDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
