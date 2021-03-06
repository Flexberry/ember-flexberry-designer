import { Serializer as DevTypeDefinitionSerializer } from
  '../mixins/regenerated/serializers/fd-dev-type-definition';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(DevTypeDefinitionSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
