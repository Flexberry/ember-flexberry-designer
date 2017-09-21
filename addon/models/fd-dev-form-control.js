import { Model as DevFormControlMixin, defineProjections } from
  '../mixins/regenerated/models/fd-dev-form-control';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DevFormControlMixin, {

});
defineProjections(Model);
export default Model;
