import { Serializer as DevParameterSerializer } from
  '../mixins/regenerated/serializers/fd-dev-parameter';
import RepositoryDataObjectSerializer from './fd-repository-data-object';

export default RepositoryDataObjectSerializer.extend(DevParameterSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
