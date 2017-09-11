import { Model as ProjectMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-project';
import RepositoryObjectWithPluginsModel from './new-platform-flexberry-web-designer-repository-object-with-plugins';

let Model = RepositoryObjectWithPluginsModel.extend(ProjectMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
