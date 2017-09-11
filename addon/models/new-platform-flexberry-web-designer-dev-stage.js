import { Model as DevStageMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-stage';
import StageModel from './new-platform-flexberry-web-designer-stage';

let Model = StageModel.extend(DevStageMixin, {

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
