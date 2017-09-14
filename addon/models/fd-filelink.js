import { Model as FilelinkMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-filelink';
import ObjectInSystemModel from './fd-object-in-system';

let Model = ObjectInSystemModel.extend(FilelinkMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
