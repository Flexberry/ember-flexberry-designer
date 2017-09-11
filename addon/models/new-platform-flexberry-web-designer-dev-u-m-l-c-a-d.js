import { Model as DevUMLCADMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d';
import CADModel from './new-platform-flexberry-web-designer-c-a-d';

let Model = CADModel.extend(DevUMLCADMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
