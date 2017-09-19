import { Serializer as DevViewSerializer } from
  '../mixins/regenerated/serializers/fd-dev-view';
import RepositoryDataObjectSerializer from './fd-repository-data-object';

export default RepositoryDataObjectSerializer.extend(DevViewSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
