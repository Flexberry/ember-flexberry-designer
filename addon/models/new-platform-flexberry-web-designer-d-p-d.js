import { Model as DPDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-d-p-d';
import DiagramModel from './new-platform-flexberry-web-designer-diagram';

let Model = DiagramModel.extend(DPDMixin, {

});
defineBaseModel(Model);
export default Model;
