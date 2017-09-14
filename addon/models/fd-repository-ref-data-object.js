import { Model as RepositoryRefDataObjectMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-repository-ref-data-object';
import RepositoryDataObjectModel from './fd-repository-data-object';

let Model = RepositoryDataObjectModel.extend(RepositoryRefDataObjectMixin, {

});
defineBaseModel(Model);
export default Model;
