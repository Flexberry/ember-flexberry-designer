import { Model as DiagramMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-diagram';
import ObjectInSystemModel from './new-platform-flexberry-web-designer-object-in-system';

let Model = ObjectInSystemModel.extend(DiagramMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
