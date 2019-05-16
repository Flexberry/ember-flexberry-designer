import { Model as DevTaskMixin } from
  '../mixins/regenerated/models/fd-dev-task';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, DevTaskMixin, {

});
export default Model;
