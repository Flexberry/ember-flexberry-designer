import { Model as CADMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-c-a-d';
import DiagramModel from './new-platform-flexberry-web-designer-diagram';

let Model = DiagramModel.extend(CADMixin, {

});
defineBaseModel(Model);
export default Model;
