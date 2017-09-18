import { Serializer as DevModuleSettingSerializer } from
  '../mixins/regenerated/serializers/fd-dev-module-setting';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(DevModuleSettingSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
