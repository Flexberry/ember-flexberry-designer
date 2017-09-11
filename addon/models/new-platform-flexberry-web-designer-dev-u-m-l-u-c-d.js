import { Model as DevUMLUCDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d';
import UCDModel from './new-platform-flexberry-web-designer-u-c-d';

let Model = UCDModel.extend(DevUMLUCDMixin, {

});
defineBaseModel(Model);
export default Model;
