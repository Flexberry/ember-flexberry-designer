import { Serializer as RepositoryObjectWithPluginsSerializer } from
  '../mixins/regenerated/serializers/fd-repository-object-with-plugins';
import RepositoryBrowserDataObjectWithACLSerializer from './fd-repository-browser-data-object-with-a-c-l';

export default RepositoryBrowserDataObjectWithACLSerializer.extend(RepositoryObjectWithPluginsSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
