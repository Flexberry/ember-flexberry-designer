import {
  defineBaseModel,
  defineProjections,
  Model as DevRealizationMixin
} from '../mixins/regenerated/models/fd-dev-realization';

import RealizationModel from './fd-realization';

let Model = RealizationModel.extend(DevRealizationMixin, {
});

defineBaseModel(Model);
defineProjections(Model);

export default Model;
