import { Model as DevAggregationMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-aggregation';
import DevBaseAssociationModel from './new-platform-flexberry-web-designer-dev-base-association';

let Model = DevBaseAssociationModel.extend(DevAggregationMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
