import { Model as InheritanceMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-inheritance';
import RepositoryRefDataObjectModel from './fd-repository-ref-data-object';

let Model = RepositoryRefDataObjectModel.extend(InheritanceMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
