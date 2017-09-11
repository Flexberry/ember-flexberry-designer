import { Serializer as DevBaseAssociationSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-base-association';
import BaseAssociationSerializer from './new-platform-flexberry-web-designer-base-association';

export default BaseAssociationSerializer.extend(DevBaseAssociationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
