import { Serializer as StageSerializer } from
  '../mixins/regenerated/serializers/fd-stage';
import RepositoryBrowserDataObjectWithACLSerializer from './fd-repository-browser-data-object-with-a-c-l';

export default RepositoryBrowserDataObjectWithACLSerializer.extend(StageSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
