import { Model as DevClassMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-class';
import ClassModel from './fd-class';

let Model = ClassModel.extend(DevClassMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
