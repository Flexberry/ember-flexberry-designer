import { Serializer as DevUMLSTDSerializer } from
  '../mixins/regenerated/serializers/fd-dev-uml-std';
import STDSerializer from './fd-std';

export default STDSerializer.extend(DevUMLSTDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
