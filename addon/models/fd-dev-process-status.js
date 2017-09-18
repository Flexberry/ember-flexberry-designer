import { Model as DevProcessStatusMixin } from
  '../mixins/regenerated/models/fd-dev-process-status';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DevProcessStatusMixin, {

});
export default Model;
