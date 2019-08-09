import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { SignalReceiptRight, SignalReceiptLeft } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-signal-receipt';
import { Transition } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-transition';
import { ComplexTransitionH, ComplexTransitionV } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-complex-transition';
import { SignalSendLeft, SignalSendRight } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-signal-send';
import { StartState } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-start-state';
import { FinalState } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-final-state';
import { Decision } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-decision';
import { ObjectInState } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-object-in-state';
import { ActiveState } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-active-state';
import { Partition } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-partition';
import { ObjectFlow } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-object-flow';
import FdUmlSwimlineSeparator  from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-swimline-separator';
import { getJsonForElement, getJsonForLink } from '../../utils/get-json-for-diagram';

/**
  Metods for creating joint js elements on activity diagrams.

  @class FdActionsForActivityPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  /**
    Service that get current project contexts.

    @property currentProjectContext
    @type {Class}
    @default service()
  */
  currentProjectContext: service('fd-current-project-context'),

  actions: {
    /**
      Handler for click on addDecision button.

      @method actions.addDecision
      @param {jQuery.Event} e event.
    */
    addDecision(e) {
      this.createObjectData((function(x, y) {
        let newDecisionObject = new Decision({
          position: { x: x, y: y },
          size: { width: 70, height: 40 },
          name: ''
        });

        return newDecisionObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addActiveState button.

      @method actions.addActiveState
      @param {jQuery.Event} e event.
    */
    addActiveState(e) {
      this.createObjectData((function(x, y) {
        let newActiveStateObject = new ActiveState({
          position: { x: x, y: y },
          size: { width: 90, height: 50 }
        });

        return newActiveStateObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addaddStartState button.

      @method actions.addActiveState
      @param {jQuery.Event} e event.
    */
    addStartState(e) {
      this.createObjectData((function(x, y) {
        let newStartStateObject = new StartState({
          position: { x: x, y: y },
          size: { width: 20, height: 20 }
        });

        return newStartStateObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addaddFinalState button.

      @method actions.addFinalState
      @param {jQuery.Event} e event.
    */
    addFinalState(e) {
      this.createObjectData((function(x, y) {
        let newFinalStateObject = new FinalState({
          position: { x: x, y: y },
          size: { width: 20, height: 20 }
        });

        return newFinalStateObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addComplexTransitionH button.

      @method actions.addComplexTransitionH
      @param {jQuery.Event} e event.
    */
    addComplexTransitionH(e) {
      this.createObjectData((function(x, y) {
        let newComplexTransitionHObject = new ComplexTransitionH({
          position: { x: x, y: y },
          size: { width: 60, height: 20 }
        });

        return newComplexTransitionHObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addComplexTransitionH button.

      @method actions.addComplexTransitionV
      @param {jQuery.Event} e event.
    */
    addComplexTransitionV(e) {
      this.createObjectData((function(x, y) {
        let newComplexTransitionVObject = new ComplexTransitionV({
          position: { x: x, y: y },
          size: { width: 20, height: 30 }
        });

        return newComplexTransitionVObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addObjectInState button.

      @method actions.addObjectInState
      @param {jQuery.Event} e event.
    */
    addObjectInState(e) {
      this.createObjectData((function(x, y) {
        let newObjectInStateObject = new ObjectInState({
          position: { x: x, y: y },
          size: { width: 100, height: 60 }
        });

        return newObjectInStateObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addSignalReceiptL button.

      @method actions.addSignalReceiptL
      @param {jQuery.Event} e event.
    */
    addSignalReceiptL(e) {
      this.createObjectData((function(x, y) {
        let newSignalSendLeftObject = new SignalReceiptLeft({
          position: { x: x, y: y },
          size: { width: 100, height: 30 }
        });

        return newSignalSendLeftObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addSignalReceiptR button.

      @method actions.addSignalReceiptR
      @param {jQuery.Event} e event.
    */
    addSignalReceiptR(e) {
      this.createObjectData((function(x, y) {
        let newSignalSendRightObject = new SignalReceiptRight({
          position: { x: x, y: y },
          size: { width: 100, height: 30 }
        });

        return newSignalSendRightObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addSignalSendingL button.

      @method actions.addSignalSendingL
      @param {jQuery.Event} e event.
    */
    addSignalSendingL(e) {
      this.createObjectData((function(x, y) {
        let newSignalSendLeftObject = new SignalSendLeft({
          position: { x: x, y: y },
          size: { width: 100, height: 30 }
        });

        return newSignalSendLeftObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addSignalSendingR button.

      @method actions.addSignalSendingR
      @param {jQuery.Event} e event.
    */
    addSignalSendingR(e) {
      this.createObjectData((function(x, y) {
        let newSignalSendRightObject = new SignalSendRight({
          position: { x: x, y: y },
          size: { width: 100, height: 30 }
        });

        return newSignalSendRightObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addTransition button.

      @method actions.addTransition
      @param {jQuery.Event} e event.
    */
    addTransition(e) {
      this.createLinkData((function(linkProperties) {
        let newTransitionObject = new Transition({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newTransitionObject;
      }).bind(this), e, A(['flexberry.uml.Decision', 'flexberry.uml.ActiveState', 'flexberry.uml.StartState',
       'flexberry.uml.FinalState', 'flexberry.uml.ComplexTransitionH', 'flexberry.uml.ComplexTransitionV', 'flexberry.uml.SignalReceiptRight',
       'flexberry.uml.SignalReceiptLeft', 'flexberry.uml.SignalSendLeft', 'flexberry.uml.SignalSendRight']));
    },

    /**
      Handler for click on addObjectFlow button.

      @method actions.addObjectFlow
      @param {jQuery.Event} e event.
    */
    addObjectFlow(e) {
      this.createLinkData((function(linkProperties) {
        let newObjectFlowObject = new ObjectFlow({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newObjectFlowObject;
      }).bind(this), e, A(['flexberry.uml.ActiveState', 'flexberry.uml.ComplexTransitionH',
       'flexberry.uml.ComplexTransitionV', 'flexberry.uml.ObjectInState', 'flexberry.uml.SignalSendLeft',
       'flexberry.uml.SignalSendRight']));
    },

    /**
      Handler for click on addPartition button.

      @method actions.addPartition
      @param {jQuery.Event} e event.
    */
    addPartition(e) {
      this.createObjectData((function(x, y) {
        let newPartitionObject = new Partition({
          position: { x: x, y: y },
          size: { width: 150, height: 110 }
        });

        return newPartitionObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addSwimlineSeparatorH button.
      @ethod actions.addSwimlineSeparatorH
      @param {jQuery.Event} e event.
    */
    addSwimlineSeparatorH(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.SwimlineSeparatorH, UMLAD',
          { x, y },
          { width: 100, height: 30 },
          { Name: '' },
        );
        let swimlineSeparatorObject = FdUmlSwimlineSeparator.create({ primitive: jsonObject });
        this._addToPrimitives(swimlineSeparatorObject);
        return swimlineSeparatorObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Partition']));
    },

    /**
      Handler for click on addSwimlineSeparatorV button.
      @ethod actions.addSwimlineSeparatorV
      @param {jQuery.Event} e event.
    */
    addSwimlineSeparatorV(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.SwimlineSeparatorV, UMLAD',
          { x, y },
          { width: 100, height: 30 },
          { Name: '', BindingObjectID: '' },
        );
        let swimlineSeparatorObject = FdUmlSwimlineSeparator.create({ primitive: jsonObject });
        this._addToPrimitives(swimlineSeparatorObject);
        return swimlineSeparatorObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Partition']));
    },
  }
});

