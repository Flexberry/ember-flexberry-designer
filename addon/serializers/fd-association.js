import { Serializer as AssociationSerializer } from
  '../mixins/regenerated/serializers/fd-association';
import BaseAssociationSerializer from './fd-base-association';

export default BaseAssociationSerializer.extend(AssociationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
