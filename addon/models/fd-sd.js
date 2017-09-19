import { Model as SDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-sd';
import DiagramModel from './fd-diagram';

let Model = DiagramModel.extend(SDMixin, {

});
defineBaseModel(Model);
export default Model;
