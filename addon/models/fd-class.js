import { Model as ClassMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-class';
import RepositoryRefDataObjectModel from './fd-repository-ref-data-object';

let Model = RepositoryRefDataObjectModel.extend(ClassMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
