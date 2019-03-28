/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';

import StageModel from './fd-stage';
import {
  Model as DevStageMixin,
  defineProjections,
  defineBaseModel,
} from '../mixins/regenerated/models/fd-dev-stage';

import { deserialize, serialize } from '../utils/transforms-utils/fd-type-map-functions';

/**
  Model for stage.

  @class FdDevStageModel
  @extends FdStageModel
  @uses FdDevStageModelMixin
*/
let Model = StageModel.extend(DevStageMixin, {
  /**
    Deserialized type map for C#.

    @private
    @property _typeMapCS
    @type Ember.NativeArray
  */
  _typeMapCS: undefined,

  /**
    Deserialized type map for C#.

    @property typeMapCS
    @type Ember.NativeArray
  */
  typeMapCS: Ember.computed('_typeMapCS.@each.{value,assemblyDll}', function() {
    let typeMapCS = this.get('_typeMapCS');
    if (typeMapCS) {
      this.set('typeMapCSStr', serialize(typeMapCS.toArray()));
    } else {
      typeMapCS = Ember.A(deserialize(this.get('typeMapCSStr')));
      this.set('_typeMapCS', typeMapCS);
    }

    return typeMapCS;
  }),

  /**
    See [EmberJS API](https://emberjs.com/).

    @method rolledBack
  */
  rolledBack() {
    this.set('_typeMapCS', undefined);

    return this._super(...arguments);
  },
});

defineBaseModel(Model);

defineProjections(Model);

export default Model;
