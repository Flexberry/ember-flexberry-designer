import { Model as DevSystemMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-system';
import SubsystemModel from './fd-subsystem';

let Model = SubsystemModel.extend(DevSystemMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
