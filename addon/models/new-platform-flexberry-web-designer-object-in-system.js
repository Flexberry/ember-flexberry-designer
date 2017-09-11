import { Model as ObjectInSystemMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-object-in-system';
import RepositoryBrowserDataObjectModel from './new-platform-flexberry-web-designer-repository-browser-data-object';

let Model = RepositoryBrowserDataObjectModel.extend(ObjectInSystemMixin, {

});
defineBaseModel(Model);
export default Model;
