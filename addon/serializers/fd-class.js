import { Serializer as ClassSerializer } from
  '../mixins/regenerated/serializers/fd-class';
import RepositoryRefDataObjectSerializer from './fd-repository-ref-data-object';

export default RepositoryRefDataObjectSerializer.extend(ClassSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
