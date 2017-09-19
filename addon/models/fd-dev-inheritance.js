import { Model as DevInheritanceMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-inheritance';
import InheritanceModel from './fd-inheritance';

let Model = InheritanceModel.extend(DevInheritanceMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
