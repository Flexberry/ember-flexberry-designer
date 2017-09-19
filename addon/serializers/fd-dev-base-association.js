import { Serializer as DevBaseAssociationSerializer } from
  '../mixins/regenerated/serializers/fd-dev-base-association';
import BaseAssociationSerializer from './fd-base-association';

export default BaseAssociationSerializer.extend(DevBaseAssociationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
