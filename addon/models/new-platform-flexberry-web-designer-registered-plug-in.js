import { Model as RegisteredPlugInMixin } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-registered-plug-in';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, RegisteredPlugInMixin, {

});
export default Model;
