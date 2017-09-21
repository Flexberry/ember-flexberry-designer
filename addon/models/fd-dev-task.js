import { Model as DevTaskMixin } from
  '../mixins/regenerated/models/fd-dev-task';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DevTaskMixin, {

});
export default Model;
