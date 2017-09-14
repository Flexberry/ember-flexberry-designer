import { Serializer as StageHistorySerializer } from
  '../mixins/regenerated/serializers/fd-dev-stage-history';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(StageHistorySerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
