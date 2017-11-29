import { Model as GenerationStepLogMixin, defineProjections } from
  '../mixins/regenerated/models/fd-generation-step-log';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, GenerationStepLogMixin, {

});
defineProjections(Model);
export default Model;
