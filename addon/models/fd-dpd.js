import { Model as DPDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dpd';
import DiagramModel from './fd-diagram';

let Model = DiagramModel.extend(DPDMixin, {

});
defineBaseModel(Model);
export default Model;
