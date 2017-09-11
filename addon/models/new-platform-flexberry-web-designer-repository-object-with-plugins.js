import { Model as RepositoryObjectWithPluginsMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-repository-object-with-plugins';
import RepositoryBrowserDataObjectWithACLModel from './new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l';

let Model = RepositoryBrowserDataObjectWithACLModel.extend(RepositoryObjectWithPluginsMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
