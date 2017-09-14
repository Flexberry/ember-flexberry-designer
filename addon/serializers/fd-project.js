import { Serializer as ProjectSerializer } from
  '../mixins/regenerated/serializers/fd-project';
import RepositoryObjectWithPluginsSerializer from './fd-repository-object-with-plugins';

export default RepositoryObjectWithPluginsSerializer.extend(ProjectSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
