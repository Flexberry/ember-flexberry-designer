import { Model as RegisteredPlugInMixin } from
  '../mixins/regenerated/models/fd-registered-plug-in';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, RegisteredPlugInMixin, {

});
export default Model;
