import { Model as AuthTypeMixin } from
  '../mixins/regenerated/models/fd-auth-type';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, AuthTypeMixin, {

});

export default Model;
