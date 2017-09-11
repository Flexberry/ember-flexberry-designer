import { Model as ADMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-a-d';
import DiagramModel from './new-platform-flexberry-web-designer-diagram';

let Model = DiagramModel.extend(ADMixin, {

});
defineBaseModel(Model);
export default Model;
