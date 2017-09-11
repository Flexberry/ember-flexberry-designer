import { Serializer as AssociationSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-association';
import BaseAssociationSerializer from './new-platform-flexberry-web-designer-base-association';

export default BaseAssociationSerializer.extend(AssociationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
