import { Model as DevAssociatedDetailViewMixin, defineProjections } from
  '../mixins/regenerated/models/fd-dev-associated-detail-view';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, DevAssociatedDetailViewMixin, {

});
defineProjections(Model);
export default Model;
