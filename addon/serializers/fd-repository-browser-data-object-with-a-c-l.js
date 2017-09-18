import { Serializer as RepositoryBrowserDataObjectWithACLSerializer } from
  '../mixins/regenerated/serializers/fd-repository-browser-data-object-with-a-c-l';
import RepositoryBrowserDataObjectSerializer from './fd-repository-browser-data-object';

export default RepositoryBrowserDataObjectSerializer.extend(RepositoryBrowserDataObjectWithACLSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
