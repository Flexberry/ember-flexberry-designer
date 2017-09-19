import { Model as DevMethodMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-method';
import RepositoryDataObjectModel from './fd-repository-data-object';

let Model = RepositoryDataObjectModel.extend(DevMethodMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
