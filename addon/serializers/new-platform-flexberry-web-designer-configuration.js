import { Serializer as ConfigurationSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-configuration';
import RepositoryObjectWithPluginsSerializer from './new-platform-flexberry-web-designer-repository-object-with-plugins';

export default RepositoryObjectWithPluginsSerializer.extend(ConfigurationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
