import { Serializer as DevAssociationSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-association';
import DevBaseAssociationSerializer from './new-platform-flexberry-web-designer-dev-base-association';

export default DevBaseAssociationSerializer.extend(DevAssociationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
