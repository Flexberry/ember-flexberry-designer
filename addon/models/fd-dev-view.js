import { Model as DevViewMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-view';
import RepositoryDataObjectModel from './fd-repository-data-object';
import DS from 'ember-data';

let Model = RepositoryDataObjectModel.extend(DevViewMixin, {
  definition: DS.attr('fd-definition')

});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
