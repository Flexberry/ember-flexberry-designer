import { Serializer as DevFormViewSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-form-view';
import RepositoryDataObjectSerializer from './new-platform-flexberry-web-designer-repository-data-object';

export default RepositoryDataObjectSerializer.extend(DevFormViewSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
