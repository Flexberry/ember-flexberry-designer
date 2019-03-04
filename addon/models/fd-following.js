import { Model as FollowingMixin } from
  '../mixins/regenerated/models/fd-following';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, FollowingMixin, {

});

export default Model;
