import { Model as DevFilelinkMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-filelink';
import FilelinkModel from './fd-filelink';

let Model = FilelinkModel.extend(DevFilelinkMixin, {

});
defineBaseModel(Model);
export default Model;
