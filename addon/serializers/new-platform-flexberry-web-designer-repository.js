import { Serializer as RepositorySerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-repository';
import RepositoryObjectWithPluginsSerializer from './new-platform-flexberry-web-designer-repository-object-with-plugins';

export default RepositoryObjectWithPluginsSerializer.extend(RepositorySerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
