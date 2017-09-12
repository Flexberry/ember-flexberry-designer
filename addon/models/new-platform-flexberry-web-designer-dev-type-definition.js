import { Model as DevTypeDefinitionMixin, defineProjections } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-type-definition';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DevTypeDefinitionMixin, {

});
defineProjections(Model);
export default Model;
