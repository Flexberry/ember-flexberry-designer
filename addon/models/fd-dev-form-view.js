/* eslint-disable ember/no-side-effects */
import { Model as DevFormViewMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-form-view';
import RepositoryDataObjectModel from './fd-repository-data-object';
import { computed } from '@ember/object';
import { deserialize, serialize } from '../utils/transforms-utils/fd-data-object-type';

let Model = RepositoryDataObjectModel.extend(DevFormViewMixin, {

  /**
    Deserialized dataObjectTypesStr.

    @private
    @property _dataObjectTypesStr
    @type Ember.Object
  */
  _dataObjectTypesStr: undefined,

  /**
    Deserialized dataObjectTypesStr.

    @property dataObjectTypesStrObject
    @type Ember.Object
  */
  dataObjectTypes: computed('_dataObjectTypesStr.{className,editContainerName,newContainerName}', function() {
    let dataObjectTypesStr = this.get('_dataObjectTypesStr');
    if (dataObjectTypesStr) {
      this.set('dataObjectTypesStr', serialize(dataObjectTypesStr));
    } else {
      dataObjectTypesStr = deserialize(this.get('dataObjectTypesStr'));
      this.set('_dataObjectTypesStr', dataObjectTypesStr);
    }

    return dataObjectTypesStr;
  }),

  /**
    See [EmberJS API](https://emberjs.com/).

    @method rollbackAttributes
  */
  rollbackAttributes() {
    this.set('_dataObjectTypesStr', undefined);

    return this._super(...arguments);
  },
});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
