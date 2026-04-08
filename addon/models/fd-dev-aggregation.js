import { Model as DevAggregationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-aggregation';
import DevBaseAssociationModel from './fd-dev-base-association';
import FdLockFieldsMixin from '../mixins/fd-lock-fields';

let Model = DevBaseAssociationModel.extend(DevAggregationMixin, FdLockFieldsMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
