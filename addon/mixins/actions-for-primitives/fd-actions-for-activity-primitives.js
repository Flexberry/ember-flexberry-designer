import Ember from 'ember';
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

/**
  Metods for creating joint js elements on activity diagrams.

  @class FdActionsForActivityPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
  /**
    Service that get current project contexts.

    @property currentProjectContext
    @type {Class}
    @default Ember.inject.service()
  */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

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
          size: { width: 100, height: 40 },
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
          size: { width: 100, height: 40 }
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
          size: { width: 40, height: 40 }
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
          size: { width: 40, height: 40 }
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
          size: { width: 100, height: 40 }
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
          size: { width: 100, height: 40 }
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
          size: { width: 100, height: 40 }
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
          size: { width: 100, height: 40 }
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
          size: { width: 100, height: 40 }
        });

        return newSignalSendRightObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addSignalSignalSendingL button.

      @method actions.addSignalSignalSendingL
      @param {jQuery.Event} e event.
    */
    addSignalSignalSendingL(e) {
      this.createObjectData((function(x, y) {
        let newSignalSendLeftObject = new SignalSendLeft({
          position: { x: x, y: y },
          size: { width: 100, height: 40 }
        });

        return newSignalSendLeftObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addSignalSignalSendingR button.

      @method actions.addSignalSignalSendingR
      @param {jQuery.Event} e event.
    */
    addSignalSignalSendingR(e) {
      this.createObjectData((function(x, y) {
        let newSignalSendRightObject = new SignalSendRight({
          position: { x: x, y: y },
          size: { width: 100, height: 40 }
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
          vertices: linkProperties.points
        });

        return newTransitionObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Decision', 'flexberry.uml.ActiveState', 'flexberry.uml.StartState',
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
          vertices: linkProperties.points
        });

        return newObjectFlowObject;
      }).bind(this), e, Ember.A(['flexberry.uml.ActiveState', 'flexberry.uml.ComplexTransitionH',
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
          size: { width: 100, height: 40 }
        });

        return newPartitionObject;
      }).bind(this), e);
    }
  }
});

