import {
  defineBaseModel,
  defineProjections,
  Model as RealizationMixin
} from '../mixins/regenerated/models/fd-realization';

import RepositoryRefDataObjectModel from './fd-repository-ref-data-object';

let Model = RepositoryRefDataObjectModel.extend(RealizationMixin, {
});

defineBaseModel(Model);
defineProjections(Model);

export default Model;
