import { Model as DevAttributeMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-attribute';
import RepositoryDataObjectModel from './new-platform-flexberry-web-designer-repository-data-object';

let Model = RepositoryDataObjectModel.extend(DevAttributeMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
