import { Model as StorageTypeMixin, defineProjections } from
  '../mixins/regenerated/models/fd-storage-type';
import { Projection } from 'ember-flexberry-data';
let Model = Projection.Model.extend(StorageTypeMixin, {

});
defineProjections(Model);
export default Model;
