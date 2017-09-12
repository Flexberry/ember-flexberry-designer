import { Serializer as DevInheritanceSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-inheritance';
import InheritanceSerializer from './new-platform-flexberry-web-designer-inheritance';

export default InheritanceSerializer.extend(DevInheritanceSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
