import { Model as RepositoryBrowserDataObjectMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-repository-browser-data-object';
import RepositoryDataObjectModel from './new-platform-flexberry-web-designer-repository-data-object';

let Model = RepositoryDataObjectModel.extend(RepositoryBrowserDataObjectMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
