import { Serializer as DevFormViewSerializer } from
  '../mixins/regenerated/serializers/fd-dev-form-view';
import RepositoryDataObjectSerializer from './fd-repository-data-object';

export default RepositoryDataObjectSerializer.extend(DevFormViewSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
