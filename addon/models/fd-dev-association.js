import { Model as DevAssociationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-association';
import DevBaseAssociationModel from './fd-dev-base-association';
import FdLockFieldsMixin from '../mixins/fd-lock-fields';

let Model = DevBaseAssociationModel.extend(DevAssociationMixin, FdLockFieldsMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
