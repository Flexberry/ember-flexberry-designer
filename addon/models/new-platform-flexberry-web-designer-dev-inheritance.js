import { Model as DevInheritanceMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-inheritance';
import InheritanceModel from './new-platform-flexberry-web-designer-inheritance';

let Model = InheritanceModel.extend(DevInheritanceMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
