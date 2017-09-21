import { Serializer as RepositoryRefDataObjectSerializer } from
  '../mixins/regenerated/serializers/fd-repository-ref-data-object';
import RepositoryDataObjectSerializer from './fd-repository-data-object';

export default RepositoryDataObjectSerializer.extend(RepositoryRefDataObjectSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
