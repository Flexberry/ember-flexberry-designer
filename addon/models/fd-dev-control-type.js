import { Model as DevControlTypeMixin, defineProjections } from
  '../mixins/regenerated/models/fd-dev-control-type';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, DevControlTypeMixin, {

});
defineProjections(Model);
export default Model;
