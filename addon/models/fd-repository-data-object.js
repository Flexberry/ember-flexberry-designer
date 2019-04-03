import { Model as RepositoryDataObjectMixin, defineProjections } from
  '../mixins/regenerated/models/fd-repository-data-object';
import model from 'ember-flexberry-data/models/model';
import OfflineModelMixin from 'ember-flexberry-data/mixins/offline-model';
let Model = model.extend(OfflineModelMixin, RepositoryDataObjectMixin, {

});
defineProjections(Model);
export default Model;
