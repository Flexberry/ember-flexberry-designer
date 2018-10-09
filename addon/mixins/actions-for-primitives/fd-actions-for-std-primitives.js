import Ember from 'ember';
import { StateEx } from '../../objects/uml-primitives/fd-uml-state-ex';
import { StdClass } from '../../objects/uml-primitives/fd-uml-std-class';
import { State } from '../../objects/uml-primitives/fd-uml-state';
import { ComplexTransitionH, ComplexTransitionV } from '../../objects/uml-primitives/fd-uml-complex-transition';
import { Connection } from '../../objects/uml-primitives/fd-uml-connection';
import { History, DeepHistory } from '../../objects/uml-primitives/fd-uml-history';
import { StartState } from '../../objects/uml-primitives/fd-uml-start-state';
import { FinalState } from '../../objects/uml-primitives/fd-uml-final-state';

/**
  Actions for creating joint js elements on diagrams.

  @class FdAcrionsForStdPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
  actions: {
    /**
      Handler for click on addStdClass button.

      @method actions.addStdClass
      @param {jQuery.Event} e event.
     */
    addStdClass(e) {
      this.createObjectData((function(x, y) {
        let newStdClassObject = new StdClass({
          position: { x: x, y: y },
          size: { width: 100, height: 40 },
          name: ''
        });

        return newStdClassObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addState button.

      @method actions.addState
      @param {jQuery.Event} e event.
     */
    addState(e) {
      this.createObjectData((function(x, y) {
        let newStateObject = new State({
          position: { x: x, y: y },
          size: { width: 100, height: 40 },
          name: ''
        });

        return newStateObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addStateEx button.

      @method actions.addStateEx
      @param {jQuery.Event} e event.
     */
    addStateEx(e) {
      this.createObjectData((function(x, y) {
        let newStateExObject = new StateEx({
          position: { x: x, y: y },
          size: { width: 100, height: 40 },
          name: ''
        });

        return newStateExObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addConcurrentState button.

      @method actions.addConcurrentState
      @param {jQuery.Event} e event.
     */
    addConcurrentState() {
      // TODO Add action when create primitive 'ConcurrentState' TFS 169738
    },

    /**
      Handler for click on addHistory button.

      @method actions.addHistory
      @param {jQuery.Event} e event.
     */
    addHistory(e) {
      this.createObjectData((function(x, y) {
        let newHistoryObject = new History({
          position: { x: x, y: y },
        });

        return newHistoryObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addDeepHistory button.

      @method actions.addDeepHistory
      @param {jQuery.Event} e event.
     */
    addDeepHistory(e) {
      this.createObjectData((function(x, y) {
        let newDeepHistoryObject = new DeepHistory({
          position: { x: x, y: y },
        });

        return newDeepHistoryObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addStartState button.

      @method actions.addStartState
      @param {jQuery.Event} e event.
     */
    addStartState(e) {
      this.createObjectData((function(x, y) {
        let newStartStateObject = new StartState({
          position: { x: x, y: y },
        });

        return newStartStateObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addFinalState button.

      @method actions.addFinalState
      @param {jQuery.Event} e event.
     */
    addFinalState(e) {
      this.createObjectData((function(x, y) {
        let newFinalStateObject = new FinalState({
          position: { x: x, y: y },
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
          size: { width: 200 },
        });

        return newComplexTransitionHObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addComplexTransitionV button.

      @method actions.addComplexTransitionV
      @param {jQuery.Event} e event.
     */
    addComplexTransitionV(e) {
      this.createObjectData((function(x, y) {
        let newComplexTransitionVObject = new ComplexTransitionV({
          position: { x: x, y: y },
          size: { height: 200 },
        });

        return newComplexTransitionVObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addOnStdTransition button.

      @method actions.addOnStdTransition
      @param {jQuery.Event} e event.
     */
    addOnStdTransition(e) {
      this.createLinkData((function(linkProperties) {
        let newTransitionObject = new Connection({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || Ember.A()
        });

        return newTransitionObject;
      }).bind(this), e, Ember.A(['flexberry.uml.State', 'flexberry.uml.StateEx', 'flexberry.uml.ComplexTransitionH', 'flexberry.uml.ComplexTransitionV']));
    },

    /**
      Handler for click on addEventMessage button.

      @method actions.addEventMessage
      @param {jQuery.Event} e event.
     */
    addEventMessage() {
      // TODO Add action when create primitive 'EventMessage' TFS 169738
    },
  }
});
