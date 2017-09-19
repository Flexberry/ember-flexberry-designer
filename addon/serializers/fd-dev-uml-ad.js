import { Serializer as DevUMLADSerializer } from
  '../mixins/regenerated/serializers/fd-dev-uml-ad';
import ADSerializer from './fd-ad';

export default ADSerializer.extend(DevUMLADSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
