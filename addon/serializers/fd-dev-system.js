import { Serializer as DevSystemSerializer } from
  '../mixins/regenerated/serializers/fd-dev-system';
import SubsystemSerializer from './fd-subsystem';

export default SubsystemSerializer.extend(DevSystemSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
