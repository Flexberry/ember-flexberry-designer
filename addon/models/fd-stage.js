import { Model as StageMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-stage';
import RepositoryBrowserDataObjectWithACLModel from './fd-repository-browser-data-object-with-a-c-l';

let Model = RepositoryBrowserDataObjectWithACLModel.extend(StageMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
