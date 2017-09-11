import { Serializer as DevAssociatedDetailViewSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-associated-detail-view';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(DevAssociatedDetailViewSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
