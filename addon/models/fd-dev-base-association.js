import { Model as DevBaseAssociationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-base-association';
import BaseAssociationModel from './fd-base-association';

let Model = BaseAssociationModel.extend(DevBaseAssociationMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
