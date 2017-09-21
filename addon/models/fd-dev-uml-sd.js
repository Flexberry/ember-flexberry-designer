import { Model as DevUMLSDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-sd';
import SDModel from './fd-sd';

let Model = SDModel.extend(DevUMLSDMixin, {

});
defineBaseModel(Model);
export default Model;
