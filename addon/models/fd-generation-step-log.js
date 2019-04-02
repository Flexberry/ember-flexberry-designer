import { Model as GenerationStepLogMixin, defineProjections } from
  '../mixins/regenerated/models/fd-generation-step-log';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, GenerationStepLogMixin, {

});
defineProjections(Model);
export default Model;
