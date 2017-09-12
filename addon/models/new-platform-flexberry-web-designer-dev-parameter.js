import { Model as DevParameterMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-parameter';
import RepositoryDataObjectModel from './new-platform-flexberry-web-designer-repository-data-object';

let Model = RepositoryDataObjectModel.extend(DevParameterMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
