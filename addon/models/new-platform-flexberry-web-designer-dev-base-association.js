import { Model as DevBaseAssociationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-base-association';
import BaseAssociationModel from './new-platform-flexberry-web-designer-base-association';

let Model = BaseAssociationModel.extend(DevBaseAssociationMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
