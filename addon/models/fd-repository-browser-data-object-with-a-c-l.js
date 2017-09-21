import { Model as RepositoryBrowserDataObjectWithACLMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-repository-browser-data-object-with-a-c-l';
import RepositoryBrowserDataObjectModel from './fd-repository-browser-data-object';

let Model = RepositoryBrowserDataObjectModel.extend(RepositoryBrowserDataObjectWithACLMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
