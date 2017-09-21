import { Serializer as RegisteredPlugInSerializer } from
  '../mixins/regenerated/serializers/fd-registered-plug-in';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(RegisteredPlugInSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
