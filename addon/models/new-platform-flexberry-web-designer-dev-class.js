import { Model as DevClassMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-class';
import ClassModel from './new-platform-flexberry-web-designer-class';

let Model = ClassModel.extend(DevClassMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
