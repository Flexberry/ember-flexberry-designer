import { Serializer as DevViewSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-view';
import RepositoryDataObjectSerializer from './new-platform-flexberry-web-designer-repository-data-object';

export default RepositoryDataObjectSerializer.extend(DevViewSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
