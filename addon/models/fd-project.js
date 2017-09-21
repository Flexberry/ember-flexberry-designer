import { Model as ProjectMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-project';
import RepositoryObjectWithPluginsModel from './fd-repository-object-with-plugins';

let Model = RepositoryObjectWithPluginsModel.extend(ProjectMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
