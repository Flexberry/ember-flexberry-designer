import { Serializer as ObjectInSystemSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-object-in-system';
import RepositoryBrowserDataObjectSerializer from './new-platform-flexberry-web-designer-repository-browser-data-object';

export default RepositoryBrowserDataObjectSerializer.extend(ObjectInSystemSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
