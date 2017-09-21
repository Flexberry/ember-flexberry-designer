import { Model as SubsystemMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-subsystem';
import RepositoryBrowserDataObjectModel from './fd-repository-browser-data-object';

let Model = RepositoryBrowserDataObjectModel.extend(SubsystemMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
