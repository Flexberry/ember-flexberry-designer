import { Serializer as RepositoryBrowserDataObjectSerializer } from
  '../mixins/regenerated/serializers/fd-repository-browser-data-object';
import RepositoryDataObjectSerializer from './fd-repository-data-object';

export default RepositoryDataObjectSerializer.extend(RepositoryBrowserDataObjectSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
