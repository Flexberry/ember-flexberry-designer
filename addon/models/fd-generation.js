import { Model as GenerationMixin, defineProjections } from
  '../mixins/regenerated/models/fd-generation';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, GenerationMixin, {

});
defineProjections(Model);
export default Model;
