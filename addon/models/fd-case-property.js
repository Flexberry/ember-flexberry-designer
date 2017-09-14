import { Model as CasePropertyMixin } from
  '../mixins/regenerated/models/fd-case-property';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, CasePropertyMixin, {

});
export default Model;
