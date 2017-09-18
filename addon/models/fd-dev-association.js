import { Model as DevAssociationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-association';
import DevBaseAssociationModel from './fd-dev-base-association';

let Model = DevBaseAssociationModel.extend(DevAssociationMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
