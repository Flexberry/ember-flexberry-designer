import { Model as STDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-std';
import DiagramModel from './fd-diagram';

let Model = DiagramModel.extend(STDMixin, {

});
defineBaseModel(Model);
export default Model;
