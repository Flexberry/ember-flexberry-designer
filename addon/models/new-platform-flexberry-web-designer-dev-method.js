import { Model as DevMethodMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-method';
import RepositoryDataObjectModel from './new-platform-flexberry-web-designer-repository-data-object';

let Model = RepositoryDataObjectModel.extend(DevMethodMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
