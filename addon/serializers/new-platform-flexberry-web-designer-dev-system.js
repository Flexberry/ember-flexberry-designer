import { Serializer as DevSystemSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-system';
import SubsystemSerializer from './new-platform-flexberry-web-designer-subsystem';

export default SubsystemSerializer.extend(DevSystemSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
