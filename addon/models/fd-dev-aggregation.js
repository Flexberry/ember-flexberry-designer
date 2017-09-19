import { Model as DevAggregationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-aggregation';
import DevBaseAssociationModel from './fd-dev-base-association';

let Model = DevBaseAssociationModel.extend(DevAggregationMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
