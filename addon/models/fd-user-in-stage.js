import { Model as UserInStageMixin } from
  '../mixins/regenerated/models/fd-user-in-stage';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, UserInStageMixin, {

});

export default Model;
