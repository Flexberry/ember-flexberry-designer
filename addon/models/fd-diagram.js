import { Model as DiagramMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-diagram';
import ObjectInSystemModel from './fd-object-in-system';

let Model = ObjectInSystemModel.extend(DiagramMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
