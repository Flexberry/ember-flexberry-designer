import { Serializer as DevParameterSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-parameter';
import RepositoryDataObjectSerializer from './new-platform-flexberry-web-designer-repository-data-object';

export default RepositoryDataObjectSerializer.extend(DevParameterSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
