import { Serializer as RepositoryRefDataObjectSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-repository-ref-data-object';
import RepositoryDataObjectSerializer from './new-platform-flexberry-web-designer-repository-data-object';

export default RepositoryDataObjectSerializer.extend(RepositoryRefDataObjectSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
