import { Serializer as DevUMLCADSerializer } from
  '../mixins/regenerated/serializers/fd-dev-uml-cad';
import CADSerializer from './fd-cad';

export default CADSerializer.extend(DevUMLCADSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
