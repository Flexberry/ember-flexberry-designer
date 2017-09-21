import { Model as DevViewMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-view';
import RepositoryDataObjectModel from './fd-repository-data-object';

let Model = RepositoryDataObjectModel.extend(DevViewMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
