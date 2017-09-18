import { Model as BaseAssociationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-base-association';
import RepositoryRefDataObjectModel from './fd-repository-ref-data-object';

let Model = RepositoryRefDataObjectModel.extend(BaseAssociationMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
