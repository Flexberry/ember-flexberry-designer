import { Model as DevUMLCODMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-cod';
import CODModel from './fd-cod';

let Model = CODModel.extend(DevUMLCODMixin, {

});
defineBaseModel(Model);
export default Model;
