import { Model as DevSystemMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-system';
import SubsystemModel from './new-platform-flexberry-web-designer-subsystem';

let Model = SubsystemModel.extend(DevSystemMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
