import { Serializer as GenerationSerializer } from
  '../mixins/regenerated/serializers/fd-generation';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(GenerationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
