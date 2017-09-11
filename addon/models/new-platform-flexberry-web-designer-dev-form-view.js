import { Model as DevFormViewMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-form-view';
import RepositoryDataObjectModel from './new-platform-flexberry-web-designer-repository-data-object';

let Model = RepositoryDataObjectModel.extend(DevFormViewMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
