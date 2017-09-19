import { Serializer as BaseAssociationSerializer } from
  '../mixins/regenerated/serializers/fd-base-association';
import RepositoryRefDataObjectSerializer from './fd-repository-ref-data-object';

export default RepositoryRefDataObjectSerializer.extend(BaseAssociationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
