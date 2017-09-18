import { Serializer as DevAssociationSerializer } from
  '../mixins/regenerated/serializers/fd-dev-association';
import DevBaseAssociationSerializer from './fd-dev-base-association';

export default DevBaseAssociationSerializer.extend(DevAssociationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
