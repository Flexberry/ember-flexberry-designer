import { Model as DevTypeDefinitionMixin, defineProjections } from
  '../mixins/regenerated/models/fd-dev-type-definition';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, DevTypeDefinitionMixin, {

});
defineProjections(Model);
export default Model;
