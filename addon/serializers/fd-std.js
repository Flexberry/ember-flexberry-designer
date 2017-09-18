import { Serializer as STDSerializer } from
  '../mixins/regenerated/serializers/fd-std';
import DiagramSerializer from './fd-diagram';

export default DiagramSerializer.extend(STDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
