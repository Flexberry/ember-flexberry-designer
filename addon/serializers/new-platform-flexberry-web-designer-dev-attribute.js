import { Serializer as DevAttributeSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-attribute';
import RepositoryDataObjectSerializer from './new-platform-flexberry-web-designer-repository-data-object';

export default RepositoryDataObjectSerializer.extend(DevAttributeSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
