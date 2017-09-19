import { Serializer as ObjectInSystemSerializer } from
  '../mixins/regenerated/serializers/fd-object-in-system';
import RepositoryBrowserDataObjectSerializer from './fd-repository-browser-data-object';

export default RepositoryBrowserDataObjectSerializer.extend(ObjectInSystemSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
