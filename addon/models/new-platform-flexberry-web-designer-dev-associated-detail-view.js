import { Model as DevAssociatedDetailViewMixin, defineProjections } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-dev-associated-detail-view';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, DevAssociatedDetailViewMixin, {

});
defineProjections(Model);
export default Model;
