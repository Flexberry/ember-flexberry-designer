import { Model as AssociationMixin, defineBaseModel  } from
  '../mixins/regenerated/models/fd-association';
import BaseAssociationModel from './fd-base-association';

let Model = BaseAssociationModel.extend(AssociationMixin, {

});
defineBaseModel(Model);
export default Model;
