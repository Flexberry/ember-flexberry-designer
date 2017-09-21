import { Serializer as AggregationSerializer } from
  '../mixins/regenerated/serializers/fd-aggregation';
import BaseAssociationSerializer from './fd-base-association';

export default BaseAssociationSerializer.extend(AggregationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
