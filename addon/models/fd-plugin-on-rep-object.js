import { Model as PluginOnRepObjectMixin, defineProjections } from
  '../mixins/regenerated/models/fd-plugin-on-rep-object';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, PluginOnRepObjectMixin, {

});
defineProjections(Model);
export default Model;
