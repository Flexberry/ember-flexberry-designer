import { Model as DevParameterMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-parameter';
import RepositoryDataObjectModel from './fd-repository-data-object';

let Model = RepositoryDataObjectModel.extend(DevParameterMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
