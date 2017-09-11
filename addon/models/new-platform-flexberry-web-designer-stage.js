import { Model as StageMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-stage';
import RepositoryBrowserDataObjectWithACLModel from './new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l';

let Model = RepositoryBrowserDataObjectWithACLModel.extend(StageMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
