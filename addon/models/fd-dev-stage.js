import { Model as DevStageMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-stage';
import StageModel from './fd-stage';

let Model = StageModel.extend(DevStageMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
