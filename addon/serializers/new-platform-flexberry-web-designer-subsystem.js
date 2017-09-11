import { Serializer as SubsystemSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-subsystem';
import RepositoryBrowserDataObjectSerializer from './new-platform-flexberry-web-designer-repository-browser-data-object';

export default RepositoryBrowserDataObjectSerializer.extend(SubsystemSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
