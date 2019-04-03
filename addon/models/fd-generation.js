import { Model as GenerationMixin, defineProjections } from
  '../mixins/regenerated/models/fd-generation';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, GenerationMixin, {

});
defineProjections(Model);
export default Model;
