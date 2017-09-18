import { Model as DiagramLinkMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-diagram-link';
import ObjectInSystemModel from './fd-object-in-system';

let Model = ObjectInSystemModel.extend(DiagramLinkMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
