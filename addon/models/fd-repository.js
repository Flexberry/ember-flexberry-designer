import { Model as RepositoryMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-repository';
import RepositoryObjectWithPluginsModel from './fd-repository-object-with-plugins';

let Model = RepositoryObjectWithPluginsModel.extend(RepositoryMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
