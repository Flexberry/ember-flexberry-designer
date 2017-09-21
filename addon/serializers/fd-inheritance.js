import { Serializer as InheritanceSerializer } from
  '../mixins/regenerated/serializers/fd-inheritance';
import RepositoryRefDataObjectSerializer from './fd-repository-ref-data-object';

export default RepositoryRefDataObjectSerializer.extend(InheritanceSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
