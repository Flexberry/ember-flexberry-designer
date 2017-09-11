import { Serializer as BaseAssociationSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-base-association';
import RepositoryRefDataObjectSerializer from './new-platform-flexberry-web-designer-repository-ref-data-object';

export default RepositoryRefDataObjectSerializer.extend(BaseAssociationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
