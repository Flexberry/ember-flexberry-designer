import { Model as SDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-s-d';
import DiagramModel from './new-platform-flexberry-web-designer-diagram';

let Model = DiagramModel.extend(SDMixin, {

});
defineBaseModel(Model);
export default Model;
