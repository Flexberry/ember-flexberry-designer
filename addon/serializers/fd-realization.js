import { Serializer as RealizationSerializer } from
  '../mixins/regenerated/serializers/fd-realization';
import RepositoryRefDataObjectSerializer from './fd-repository-ref-data-object';

export default RepositoryRefDataObjectSerializer.extend(RealizationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
