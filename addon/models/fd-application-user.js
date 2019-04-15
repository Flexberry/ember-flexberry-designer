import { Model as ApplicationUserMixin, defineProjections } from
  '../mixins/regenerated/models/fd-application-user';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, ApplicationUserMixin, {

});

defineProjections(Model);
export default Model;
