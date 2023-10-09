import { Model as ClassMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-class';
import RepositoryRefDataObjectModel from './fd-repository-ref-data-object';

let Model = RepositoryRefDataObjectModel.extend(ClassMixin, {
  /*
    Update name of the class from nameStr.
  */
  updateName() {
    let nameStr = this.get('nameStr') || '';
    nameStr = nameStr.trim();
    if (nameStr.length > 0)
    {
        if (nameStr[0] === '/') {
          this.set('stored', false);
          nameStr = nameStr.substring(1);
        } else {
          this.set('stored', true);
        }
    }
    
    this.set('name', nameStr);
  }
});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
