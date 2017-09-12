import { Model as UCDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-u-c-d';
import DiagramModel from './new-platform-flexberry-web-designer-diagram';

let Model = DiagramModel.extend(UCDMixin, {

});
defineBaseModel(Model);
export default Model;
