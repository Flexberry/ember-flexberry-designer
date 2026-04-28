/* eslint-disable ember/no-side-effects */
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { Model as DevViewMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-view';
import RepositoryDataObjectModel from './fd-repository-data-object';

import { deserialize, serialize } from '../utils/transforms-utils/fd-definition';

let Model = RepositoryDataObjectModel.extend(DevViewMixin, {
  /**
    Deserialized definition.

    @private
    @property _definition
    @type Ember.NativeArray
  */
  _definition: undefined,

  /**
    Deserialized definition.

    @property definitionArray
    @type Ember.NativeArray
  */
  definitionArray: computed('_definition.@each.{name,caption,path,visible,lookupType,masterPropertyName,masterCustomizationString,detailViewName,loadOnLoadAgregator}', function() {
    let definition = this.get('_definition');
    if (definition) {
      this.set('definition', serialize(definition.toArray()));
    } else {
      definition = A(deserialize(this.get('definition')));
      this.set('_definition', definition);
    }

    return definition;
  }),

  /**
    See [EmberJS API](https://emberjs.com/).

    @method rollbackAttributes
  */
  rollbackAttributes() {
    this.set('_definition', undefined);

    return this._super(...arguments);
  }
});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
