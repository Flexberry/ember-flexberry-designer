import { Model as ConfigurationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-configuration';
import RepositoryObjectWithPluginsModel from './fd-repository-object-with-plugins';

let Model = RepositoryObjectWithPluginsModel.extend(ConfigurationMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
