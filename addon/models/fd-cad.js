import { Model as CADMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-cad';
import DiagramModel from './fd-diagram';

let Model = DiagramModel.extend(CADMixin, {

});
defineBaseModel(Model);
export default Model;
