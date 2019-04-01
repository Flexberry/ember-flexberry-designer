import { Model as DevModuleSettingMixin, defineProjections } from
  '../mixins/regenerated/models/fd-dev-module-setting';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, DevModuleSettingMixin, {

});
defineProjections(Model);
export default Model;
