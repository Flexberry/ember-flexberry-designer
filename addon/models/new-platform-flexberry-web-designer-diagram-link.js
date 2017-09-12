import { Model as DiagramLinkMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-diagram-link';
import ObjectInSystemModel from './new-platform-flexberry-web-designer-object-in-system';

let Model = ObjectInSystemModel.extend(DiagramLinkMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
