import { Model as DevFilelinkMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-filelink';
import FilelinkModel from './new-platform-flexberry-web-designer-filelink';

let Model = FilelinkModel.extend(DevFilelinkMixin, {

});
defineBaseModel(Model);
export default Model;
