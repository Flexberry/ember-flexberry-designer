import { Model as AggregationMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-aggregation';
import BaseAssociationModel from './fd-base-association';

let Model = BaseAssociationModel.extend(AggregationMixin, {

});
defineBaseModel(Model);
export default Model;
