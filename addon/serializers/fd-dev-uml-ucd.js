import { Serializer as DevUMLUCDSerializer } from
  '../mixins/regenerated/serializers/fd-dev-uml-ucd';
import UCDSerializer from './fd-ucd';

export default UCDSerializer.extend(DevUMLUCDSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
