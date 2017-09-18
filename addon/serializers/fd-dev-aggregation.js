import { Serializer as DevAggregationSerializer } from
  '../mixins/regenerated/serializers/fd-dev-aggregation';
import DevBaseAssociationSerializer from './fd-dev-base-association';

export default DevBaseAssociationSerializer.extend(DevAggregationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
