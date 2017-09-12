import { Model as CODMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-c-o-d';
import DiagramModel from './new-platform-flexberry-web-designer-diagram';

let Model = DiagramModel.extend(CODMixin, {

});
defineBaseModel(Model);
export default Model;
