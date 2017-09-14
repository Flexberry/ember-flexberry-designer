import { Model as DevUMLUCDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-ucd';
import UCDModel from './fd-ucd';

let Model = UCDModel.extend(DevUMLUCDMixin, {

});
defineBaseModel(Model);
export default Model;
