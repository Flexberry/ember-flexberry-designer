import { Serializer as StageSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-stage';
import RepositoryBrowserDataObjectWithACLSerializer from './new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l';

export default RepositoryBrowserDataObjectWithACLSerializer.extend(StageSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
