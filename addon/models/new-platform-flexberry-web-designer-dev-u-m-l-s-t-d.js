import { Model as DevUMLSTDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d';
import STDModel from './new-platform-flexberry-web-designer-s-t-d';

let Model = STDModel.extend(DevUMLSTDMixin, {

});
defineBaseModel(Model);
export default Model;
