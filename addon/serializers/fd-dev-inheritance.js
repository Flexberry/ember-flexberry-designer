import { Serializer as DevInheritanceSerializer } from
  '../mixins/regenerated/serializers/fd-dev-inheritance';
import InheritanceSerializer from './fd-inheritance';

export default InheritanceSerializer.extend(DevInheritanceSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
