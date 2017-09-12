import { Model as DevAssociationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-association';
import DevBaseAssociationModel from './new-platform-flexberry-web-designer-dev-base-association';

let Model = DevBaseAssociationModel.extend(DevAssociationMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
