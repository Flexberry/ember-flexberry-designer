import { Serializer as DevUMLSDSerializer } from
  '../mixins/regenerated/serializers/fd-dev-uml-sd';
import SDSerializer from './fd-sd';

export default SDSerializer.extend(DevUMLSDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
