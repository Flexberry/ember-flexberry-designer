import { Serializer as SubsystemSerializer } from
  '../mixins/regenerated/serializers/fd-subsystem';
import RepositoryBrowserDataObjectSerializer from './fd-repository-browser-data-object';

export default RepositoryBrowserDataObjectSerializer.extend(SubsystemSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
