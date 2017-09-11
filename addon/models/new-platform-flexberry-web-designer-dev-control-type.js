import { Model as DevControlTypeMixin, defineProjections } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-control-type';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DevControlTypeMixin, {

});
defineProjections(Model);
export default Model;
