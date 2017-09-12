import { Model as DevUMLADMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-u-m-l-a-d';
import ADModel from './new-platform-flexberry-web-designer-a-d';

let Model = ADModel.extend(DevUMLADMixin, {

});
defineBaseModel(Model);
export default Model;
