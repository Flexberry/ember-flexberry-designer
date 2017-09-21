import { Serializer as DevAttributeSerializer } from
  '../mixins/regenerated/serializers/fd-dev-attribute';
import RepositoryDataObjectSerializer from './fd-repository-data-object';

export default RepositoryDataObjectSerializer.extend(DevAttributeSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
