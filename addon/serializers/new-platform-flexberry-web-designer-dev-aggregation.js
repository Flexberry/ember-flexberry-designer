import { Serializer as DevAggregationSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-aggregation';
import DevBaseAssociationSerializer from './new-platform-flexberry-web-designer-dev-base-association';

export default DevBaseAssociationSerializer.extend(DevAggregationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
