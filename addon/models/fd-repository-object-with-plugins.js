import { Model as RepositoryObjectWithPluginsMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-repository-object-with-plugins';
import RepositoryBrowserDataObjectWithACLModel from './fd-repository-browser-data-object-with-a-c-l';

let Model = RepositoryBrowserDataObjectWithACLModel.extend(RepositoryObjectWithPluginsMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
