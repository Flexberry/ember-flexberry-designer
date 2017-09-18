import { Model as CODMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-cod';
import DiagramModel from './fd-diagram';

let Model = DiagramModel.extend(CODMixin, {

});
defineBaseModel(Model);
export default Model;
