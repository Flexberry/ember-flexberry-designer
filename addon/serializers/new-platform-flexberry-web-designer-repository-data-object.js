import { Serializer as RepositoryDataObjectSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-repository-data-object';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(RepositoryDataObjectSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
