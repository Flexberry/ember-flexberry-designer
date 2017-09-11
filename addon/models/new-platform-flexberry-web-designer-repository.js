import { Model as RepositoryMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-repository';
import RepositoryObjectWithPluginsModel from './new-platform-flexberry-web-designer-repository-object-with-plugins';

let Model = RepositoryObjectWithPluginsModel.extend(RepositoryMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
