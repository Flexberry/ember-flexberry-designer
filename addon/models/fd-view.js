import { Model as ViewMixin } from
  '../mixins/regenerated/models/fd-view';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, ViewMixin, {

});
export default Model;
