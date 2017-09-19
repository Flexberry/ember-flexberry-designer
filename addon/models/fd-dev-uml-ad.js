import { Model as DevUMLADMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-ad';
import ADModel from './fd-ad';

let Model = ADModel.extend(DevUMLADMixin, {

});
defineBaseModel(Model);
export default Model;
