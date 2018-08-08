import { Model as DevModuleSettingTypeMixin, defineProjections } from
  '../mixins/regenerated/models/fd-dev-module-setting-type';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DevModuleSettingTypeMixin, {

});
defineProjections(Model);
export default Model;