import { Model as DevModuleSettingTypeMixin, defineProjections } from
  '../mixins/regenerated/models/fd-dev-module-setting-type';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, DevModuleSettingTypeMixin, {

});
defineProjections(Model);
export default Model;
