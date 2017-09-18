import { Serializer as ConfigurationSerializer } from
  '../mixins/regenerated/serializers/fd-configuration';
import RepositoryObjectWithPluginsSerializer from './fd-repository-object-with-plugins';

export default RepositoryObjectWithPluginsSerializer.extend(ConfigurationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
