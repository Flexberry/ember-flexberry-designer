/* eslint-disable ember/no-side-effects */
import { computed } from '@ember/object';
import { A } from '@ember/array';
import ClassModel from './fd-class';
import { Model as DevClassMixin, defineProjections, defineBaseModel  } from
  '../mixins/regenerated/models/fd-dev-class';

import { deserialize, serialize } from '../utils/transforms-utils/fd-storeinstancesintype';

let Model = ClassModel.extend(DevClassMixin, {

  /**
    Deserialized storeInstancesInType.

    @private
    @property _storeInstancesInType
    @type Ember.NativeArray
  */
  _storeInstancesInType: undefined,

  /**
    Deserialized storeInstancesInType.

    @property storeInstancesInTypeXML
    @type Ember.NativeArray
  */
  storeInstancesInTypeXML: computed('_storeInstancesInType.@each.{dataService,data}', function() {
    let storeInstancesInType = this.get('_storeInstancesInType');
    if (storeInstancesInType) {
      this.set('storeInstancesInType', serialize(storeInstancesInType.toArray()));
    } else {
      storeInstancesInType = A(deserialize(this.get('storeInstancesInType')));
      this.set('_storeInstancesInType', storeInstancesInType);
    }

    return storeInstancesInType;
  }),

  /**
    See [EmberJS API](https://emberjs.com/).

    @method rollbackAttributes
  */
  rollbackAttributes() {
    this.set('_storeInstancesInType', undefined);

    return this._super(...arguments);
  },

  namePropertyeCompute: function() {
    //this.set('name', generateName(this.get('caption')));
  },

  // _initCaptionProperty: Ember.on('init', Ember.observer('caption', function() {
  //     Ember.run.once(this, '_namePropertyeCompute');
  //   }))
});
defineBaseModel(Model);
defineProjections(Model);
export default Model;
