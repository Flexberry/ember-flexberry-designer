import { Serializer as DevModuleSettingTypeSerializer } from
  '../mixins/regenerated/serializers/new-platform-flexberry-web-designer-dev-module-setting-type';
import __ApplicationSerializer from './application';

export default __ApplicationSerializer.extend(DevModuleSettingTypeSerializer, {
  /**
  * Field name where object identifier is kept.
  */
  primaryKey: '__PrimaryKey'
});
