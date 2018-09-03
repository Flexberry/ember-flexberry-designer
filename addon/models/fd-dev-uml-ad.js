import Ember from 'ember';
import {
  Model as DevUMLADMixin,
  defineProjections,
  defineBaseModel
} from
  '../mixins/regenerated/models/fd-dev-uml-ad';
import ADModel from './fd-ad';

import FdUmlDecision from '../objects/uml-primitives/fd-uml-decision';
import FdUmlActiveState from '../objects/uml-primitives/fd-uml-active-state';
import FdUmlStartState from '../objects/uml-primitives/fd-uml-start-state';
import FdUmlFinalState from '../objects/uml-primitives/fd-uml-final-state';
import FdUmlComplexTransition from '../objects/uml-primitives/fd-uml-complex-transition';

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

        case 'STORMCASE.UML.ad.State, UMLAD':
          result.pushObject(FdUmlActiveState.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.StartState, UMLAD':
          result.pushObject(FdUmlStartState.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.FinalState, UMLAD':
          result.pushObject(FdUmlFinalState.create({ primitive }));
          break;

        case 'STORMCASE.UML.ad.ComplexTransitionH, UMLAD':
          result.pushObject(FdUmlComplexTransition.create({ primitive }));
          break;
        case 'STORMCASE.UML.ad.ComplexTransitionV, UMLAD':
          result.pushObject(FdUmlComplexTransition.create({ primitive }));
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
