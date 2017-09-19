import { Model as ADMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-ad';
import DiagramModel from './fd-diagram';

let Model = DiagramModel.extend(ADMixin, {

});
defineBaseModel(Model);
export default Model;
