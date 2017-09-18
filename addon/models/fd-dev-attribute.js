import { Model as DevAttributeMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-attribute';
import RepositoryDataObjectModel from './fd-repository-data-object';

let Model = RepositoryDataObjectModel.extend(DevAttributeMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
