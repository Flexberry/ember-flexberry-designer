import { Model as DevUMLDPDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d';
import DPDModel from './new-platform-flexberry-web-designer-d-p-d';

let Model = DPDModel.extend(DevUMLDPDMixin, {

});
defineBaseModel(Model);
export default Model;
