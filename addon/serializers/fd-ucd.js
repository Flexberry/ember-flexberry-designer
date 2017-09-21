import { Serializer as UCDSerializer } from
  '../mixins/regenerated/serializers/fd-ucd';
import DiagramSerializer from './fd-diagram';

export default DiagramSerializer.extend(UCDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
