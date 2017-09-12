import { Serializer as DevMethodSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-method';
import RepositoryDataObjectSerializer from './new-platform-flexberry-web-designer-repository-data-object';

export default RepositoryDataObjectSerializer.extend(DevMethodSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
