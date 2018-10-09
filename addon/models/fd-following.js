import { Model as FollowingMixin } from
  '../mixins/regenerated/models/fd-following';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, FollowingMixin, {

});

export default Model;
