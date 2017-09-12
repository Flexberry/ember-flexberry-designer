import { Serializer as RepositoryObjectWithPluginsSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-repository-object-with-plugins';
import RepositoryBrowserDataObjectWithACLSerializer from './new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l';

export default RepositoryBrowserDataObjectWithACLSerializer.extend(RepositoryObjectWithPluginsSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
