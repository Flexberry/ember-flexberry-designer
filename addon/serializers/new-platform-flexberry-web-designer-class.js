import { Serializer as ClassSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-class';
import RepositoryRefDataObjectSerializer from './new-platform-flexberry-web-designer-repository-ref-data-object';

export default RepositoryRefDataObjectSerializer.extend(ClassSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
