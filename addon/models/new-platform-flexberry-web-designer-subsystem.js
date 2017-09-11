import { Model as SubsystemMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-subsystem';
import RepositoryBrowserDataObjectModel from './new-platform-flexberry-web-designer-repository-browser-data-object';

let Model = RepositoryBrowserDataObjectModel.extend(SubsystemMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
