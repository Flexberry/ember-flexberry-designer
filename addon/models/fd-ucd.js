import { Model as UCDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-ucd';
import DiagramModel from './fd-diagram';

let Model = DiagramModel.extend(UCDMixin, {

});
defineBaseModel(Model);
export default Model;
