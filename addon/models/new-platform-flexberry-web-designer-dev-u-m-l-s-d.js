import { Model as DevUMLSDMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-u-m-l-s-d';
import SDModel from './new-platform-flexberry-web-designer-s-d';

let Model = SDModel.extend(DevUMLSDMixin, {

});
defineBaseModel(Model);
export default Model;
