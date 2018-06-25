import { Model as DevStageMixin, defineProjections, defineBaseModel } from
  '../mixins/regenerated/models/fd-dev-stage';
import StageModel from './fd-stage';
import DS from 'ember-data';

let Model = StageModel.extend(DevStageMixin, {
  typeMapCSStr: DS.attr('typemap'),
});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
