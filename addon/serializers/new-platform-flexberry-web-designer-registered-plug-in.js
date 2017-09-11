import { Serializer as RegisteredPlugInSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-registered-plug-in';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(RegisteredPlugInSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
