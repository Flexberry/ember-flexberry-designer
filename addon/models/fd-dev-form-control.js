import { Model as DevFormControlMixin, defineProjections } from
  '../mixins/regenerated/models/fd-dev-form-control';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, DevFormControlMixin, {

});
defineProjections(Model);
export default Model;
