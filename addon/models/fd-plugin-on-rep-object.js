import { Model as PluginOnRepObjectMixin, defineProjections } from
  '../mixins/regenerated/models/fd-plugin-on-rep-object';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, PluginOnRepObjectMixin, {

});
defineProjections(Model);
export default Model;
