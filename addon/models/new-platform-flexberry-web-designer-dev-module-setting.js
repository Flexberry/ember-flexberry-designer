import { Model as DevModuleSettingMixin, defineProjections } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-module-setting';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DevModuleSettingMixin, {

});
defineProjections(Model);
export default Model;
