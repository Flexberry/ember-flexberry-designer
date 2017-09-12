import { Model as BaseAssociationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-base-association';
import RepositoryRefDataObjectModel from './new-platform-flexberry-web-designer-repository-ref-data-object';

let Model = RepositoryRefDataObjectModel.extend(BaseAssociationMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
