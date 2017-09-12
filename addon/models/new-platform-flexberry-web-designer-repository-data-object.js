import { Model as RepositoryDataObjectMixin, defineProjections } from
  '../mixins/regenerated/models/new-platform-flexberry-web-designer-repository-data-object';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, RepositoryDataObjectMixin, {

});
defineProjections(Model);
export default Model;
