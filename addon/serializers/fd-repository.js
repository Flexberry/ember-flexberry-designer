import { Serializer as RepositorySerializer } from
  '../mixins/regenerated/serializers/fd-repository';
import RepositoryObjectWithPluginsSerializer from './fd-repository-object-with-plugins';

export default RepositoryObjectWithPluginsSerializer.extend(RepositorySerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
