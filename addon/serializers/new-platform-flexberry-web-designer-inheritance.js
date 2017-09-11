import { Serializer as InheritanceSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-inheritance';
import RepositoryRefDataObjectSerializer from './new-platform-flexberry-web-designer-repository-ref-data-object';

export default RepositoryRefDataObjectSerializer.extend(InheritanceSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
