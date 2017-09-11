import { Model as RepositoryRefDataObjectMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-repository-ref-data-object';
import RepositoryDataObjectModel from './new-platform-flexberry-web-designer-repository-data-object';

let Model = RepositoryDataObjectModel.extend(RepositoryRefDataObjectMixin, {

});
defineBaseModel(Model);
export default Model;
