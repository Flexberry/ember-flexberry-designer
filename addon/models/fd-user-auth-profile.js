import { Model as UserAuthProfileMixin } from
  '../mixins/regenerated/models/fd-user-auth-profile';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, UserAuthProfileMixin, {

});

export default Model;
