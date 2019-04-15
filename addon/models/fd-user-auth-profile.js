import { Model as UserAuthProfileMixin } from
  '../mixins/regenerated/models/fd-user-auth-profile';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, UserAuthProfileMixin, {

});

export default Model;
