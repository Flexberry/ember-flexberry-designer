import { Model as DevUMLCODMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d';
import CODModel from './new-platform-flexberry-web-designer-c-o-d';

let Model = CODModel.extend(DevUMLCODMixin, {

});
defineBaseModel(Model);
export default Model;
