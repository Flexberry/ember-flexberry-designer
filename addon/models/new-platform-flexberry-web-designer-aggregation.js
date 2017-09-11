import { Model as AggregationMixin, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-aggregation';
import BaseAssociationModel from './new-platform-flexberry-web-designer-base-association';

let Model = BaseAssociationModel.extend(AggregationMixin, {

});
defineBaseModel(Model);
export default Model;
