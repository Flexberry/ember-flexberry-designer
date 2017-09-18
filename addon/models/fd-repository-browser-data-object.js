import { Model as RepositoryBrowserDataObjectMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-repository-browser-data-object';
import RepositoryDataObjectModel from './fd-repository-data-object';

let Model = RepositoryDataObjectModel.extend(RepositoryBrowserDataObjectMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
