import Ember from 'ember';
import {
  Model as DevUMLADMixin,
  defineProjections,
  defineBaseModel
} from
  '../mixins/regenerated/models/fd-dev-uml-ad';
import ADModel from './fd-ad';

import FdUmlDecision from '../objects/uml-primitives/fd-uml-decision';

let Model = ADModel.extend(DevUMLADMixin, {
  /**
      The array of primitives of this diagram.

      @property primitives
      @type Ember.Array
    */
  primitives: Ember.computed('primitivesJsonString', function () {
    let result = Ember.A();
    let primitives = JSON.parse(this.get('primitivesJsonString'));

    for (let i = 0; i < primitives.length; i++) {
      let primitive = primitives[i];
      switch (primitive.$type) {
        case 'STORMCASE.UML.ad.Decision, UMLAD':
          result.pushObject(FdUmlDecision.create({ primitive }));
          break;
        default:
          /* TODO: throw */ new Error(`Unknown primitive type: '${primitive.$type}'.`);
          break;
      }
    }

    return result;
  })

});

defineBaseModel(Model);

defineProjections(Model);

export default Model;
