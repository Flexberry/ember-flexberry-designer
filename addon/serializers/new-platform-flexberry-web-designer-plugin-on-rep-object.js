import { Serializer as PluginOnRepObjectSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-plugin-on-rep-object';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(PluginOnRepObjectSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
