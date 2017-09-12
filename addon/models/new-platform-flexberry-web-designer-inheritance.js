import { Model as InheritanceMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-inheritance';
import RepositoryRefDataObjectModel from './new-platform-flexberry-web-designer-repository-ref-data-object';

let Model = RepositoryRefDataObjectModel.extend(InheritanceMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
