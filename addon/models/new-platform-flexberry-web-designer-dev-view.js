import { Model as DevViewMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-view';
import RepositoryDataObjectModel from './new-platform-flexberry-web-designer-repository-data-object';

let Model = RepositoryDataObjectModel.extend(DevViewMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
