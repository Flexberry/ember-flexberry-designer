import { Model as DevUMLCADMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-cad';
import CADModel from './fd-cad';

let Model = CADModel.extend(DevUMLCADMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
