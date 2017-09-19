import { Serializer as DevUMLCODSerializer } from
  '../mixins/regenerated/serializers/fd-dev-uml-cod';
import CODSerializer from './fd-cod';

export default CODSerializer.extend(DevUMLCODSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
