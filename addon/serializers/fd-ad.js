import { Serializer as ADSerializer } from
  '../mixins/regenerated/serializers/fd-ad';
import DiagramSerializer from './fd-diagram';

export default DiagramSerializer.extend(ADSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
