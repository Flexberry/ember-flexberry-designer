import { Serializer as DevMethodSerializer } from
  '../mixins/regenerated/serializers/fd-dev-method';
import RepositoryDataObjectSerializer from './fd-repository-data-object';

export default RepositoryDataObjectSerializer.extend(DevMethodSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
