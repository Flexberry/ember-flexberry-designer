import { Model as DevFormViewMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-form-view';
import RepositoryDataObjectModel from './fd-repository-data-object';

let Model = RepositoryDataObjectModel.extend(DevFormViewMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
