import { Serializer as AggregationSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-aggregation';
import BaseAssociationSerializer from './new-platform-flexberry-web-designer-base-association';

export default BaseAssociationSerializer.extend(AggregationSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
