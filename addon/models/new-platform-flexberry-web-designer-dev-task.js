import { Model as DevTaskMixin } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-task';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DevTaskMixin, {

});
export default Model;
