import { Model as StageHistoryMixin } from
  '../mixins/regenerated/models/fd-dev-stage-history';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, StageHistoryMixin, {

});
export default Model;
