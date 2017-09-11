import { Model as ClassMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-class';
import RepositoryRefDataObjectModel from './new-platform-flexberry-web-designer-repository-ref-data-object';

let Model = RepositoryRefDataObjectModel.extend(ClassMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
