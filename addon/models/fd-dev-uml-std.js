import { Model as DevUMLSTDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-std';
import STDModel from './fd-std';

let Model = STDModel.extend(DevUMLSTDMixin, {

});
defineBaseModel(Model);
export default Model;
