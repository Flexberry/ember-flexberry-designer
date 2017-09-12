import { Model as ConfigurationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-configuration';
import RepositoryObjectWithPluginsModel from './new-platform-flexberry-web-designer-repository-object-with-plugins';

let Model = RepositoryObjectWithPluginsModel.extend(ConfigurationMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
