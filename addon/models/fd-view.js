import { Model as ViewMixin } from
  '../mixins/regenerated/models/fd-view';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, ViewMixin, {

});
export default Model;
