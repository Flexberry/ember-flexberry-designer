import { Serializer as DevClassSerializer } from
  '../mixins/regenerated/serializers/fd-dev-class';
import ClassSerializer from './fd-class';

export default ClassSerializer.extend(DevClassSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
