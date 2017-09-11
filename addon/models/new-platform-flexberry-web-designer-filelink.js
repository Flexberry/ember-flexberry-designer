import { Model as FilelinkMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-filelink';
import ObjectInSystemModel from './new-platform-flexberry-web-designer-object-in-system';

let Model = ObjectInSystemModel.extend(FilelinkMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
