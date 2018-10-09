import { Model as AuthTypeMixin } from
  '../mixins/regenerated/models/fd-auth-type';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, AuthTypeMixin, {

});

export default Model;
