import { Model as RepositoryBrowserDataObjectWithACLMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l';
import RepositoryBrowserDataObjectModel from './new-platform-flexberry-web-designer-repository-browser-data-object';

let Model = RepositoryBrowserDataObjectModel.extend(RepositoryBrowserDataObjectWithACLMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
