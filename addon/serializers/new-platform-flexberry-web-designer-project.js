import { Serializer as ProjectSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-project';
import RepositoryObjectWithPluginsSerializer from './new-platform-flexberry-web-designer-repository-object-with-plugins';

export default RepositoryObjectWithPluginsSerializer.extend(ProjectSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
