import { Model as DevUMLDPDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-uml-dpd';
import DPDModel from './fd-dpd';

let Model = DPDModel.extend(DevUMLDPDMixin, {

});
defineBaseModel(Model);
export default Model;
