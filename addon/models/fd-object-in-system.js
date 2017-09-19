import { Model as ObjectInSystemMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-object-in-system';
import RepositoryBrowserDataObjectModel from './fd-repository-browser-data-object';

let Model = RepositoryBrowserDataObjectModel.extend(ObjectInSystemMixin, {

});
defineBaseModel(Model);
export default Model;
