import { Serializer as RepositoryBrowserDataObjectSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-repository-browser-data-object';
import RepositoryDataObjectSerializer from './new-platform-flexberry-web-designer-repository-data-object';

export default RepositoryDataObjectSerializer.extend(RepositoryBrowserDataObjectSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
