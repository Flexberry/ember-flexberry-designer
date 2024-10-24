import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';
import StateEx from '../../objects/uml-primitives/fd-uml-state-ex';
import StdClass from '../../objects/uml-primitives/fd-uml-std-class';
import State from '../../objects/uml-primitives/fd-uml-state';
import ComplexTransitionH from '../../objects/uml-primitives/fd-uml-complex-transition';
import ComplexTransitionV from '../../objects/uml-primitives/fd-uml-complex-transition';
import Connection from '../../objects/uml-primitives/fd-uml-connection';
import History from '../../objects/uml-primitives/fd-uml-history';
import DeepHistory from '../../objects/uml-primitives/fd-uml-history';
import StartState from '../../objects/uml-primitives/fd-uml-start-state';
import FinalState from '../../objects/uml-primitives/fd-uml-final-state';
import { getJsonForElement, getJsonForLink } from '../../utils/get-json-for-diagram';

/**
  Actions for creating joint js elements on diagrams.

  @class FdAcrionsForStdPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  actions: {
    /**
      Handler for click on addStdClass button.

      @method actions.addStdClass
      @param {jQuery.Event} e event.
     */
    addStdClass(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.std.Class, UMLSTD',
          { x, y },
          { width: 80, height: 30 },
          { Name: '' },
          { InitialFolded: false, Folded: false }
        );
        let newStdClassObject = StdClass.create({ primitive: jsonObject });

        this._addToPrimitives(newStdClassObject);

        return newStdClassObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addState button.

      @method actions.addState
      @param {jQuery.Event} e event.
     */
    addState(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.std.State, UMLSTD',
          { x, y },
          { width: 80, height: 30 },
          { Name: '', Text: ''},
          { InitialFolded: false, Folded: false }
        );
        let newStateObject = State.create({ primitive: jsonObject });

        this._addToPrimitives(newStateObject);

        return newStateObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addStateEx button.

      @method actions.addStateEx
      @param {jQuery.Event} e event.
     */
    addStateEx(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.std.StateEx, UMLSTD',
          { x, y },
          { width: 80, height: 60 },
          { Name: '', Text: ''},
          { InitialFolded: false, Folded: false }
        );
        let newStateExObject = StateEx.create({ primitive: jsonObject });

        this._addToPrimitives(newStateExObject);

        return newStateExObject.JointJS();
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
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.std.History, UMLSTD',
          { x, y },
          { width: 20, height: 20 },
        );
        let newHistoryObject = History.create({ primitive: jsonObject });

        this._addToPrimitives(newHistoryObject);

        return newHistoryObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addDeepHistory button.

      @method actions.addDeepHistory
      @param {jQuery.Event} e event.
     */
    addDeepHistory(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.std.DeepHistory, UMLSTD',
          { x, y },
          { width: 20, height: 20 },
        );
        let newDeepHistoryObject = DeepHistory.create({ primitive: jsonObject });

        this._addToPrimitives(newDeepHistoryObject);

        return newDeepHistoryObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addStartStateStd button.

      @method actions.addStartStateStd
      @param {jQuery.Event} e event.
     */
    addStartStateStd(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.std.StartState, UMLSTD',
          { x, y },
          { width: 20, height: 20 },
          { Name: '' },
        );
        let newStartStateObject = StartState.create({ primitive: jsonObject });

        this._addToPrimitives(newStartStateObject);

        return newStartStateObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addFinalStateStd button.

      @method actions.addFinalStateStd
      @param {jQuery.Event} e event.
     */
    addFinalStateStd(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.std.FinalState, UMLSTD',
          { x, y },
          { width: 20, height: 20 },
          { Name: '' },
        );
        let newFinalStateObject = FinalState.create({ primitive: jsonObject });

        this._addToPrimitives(newFinalStateObject);

        return newFinalStateObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addComplexTransitionHStd button.

      @method actions.addComplexTransitionHStd
      @param {jQuery.Event} e event.
     */
    addComplexTransitionHStd(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.std.ComplexTransitionH, UMLSTD',
          { x, y },
          { width: 40, height: 10 },
          { Name: '' },
        );
        let newComplexTransitionHObject = ComplexTransitionH.create({ primitive: jsonObject });

        this._addToPrimitives(newComplexTransitionHObject);

        return newComplexTransitionHObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addComplexTransitionVStd button.

      @method actions.addComplexTransitionVStd
      @param {jQuery.Event} e event.
     */
    addComplexTransitionVStd(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.std.ComplexTransitionV, UMLSTD',
          { x, y },
          { width: 10, height: 40 },
          { Name: '' },
        );
        let newComplexTransitionVObject = ComplexTransitionV.create({ primitive: jsonObject });

        this._addToPrimitives(newComplexTransitionVObject);

        return newComplexTransitionVObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addOnStdTransition button.

      @method actions.addOnStdTransition
      @param {jQuery.Event} e event.
     */
    addOnStdTransition(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.std.Transition, UMLSTD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '' },
          { NamePos: 0.0 }
        );

        let newTransitionObject = Connection.create({ primitive: jsonObject });
        newTransitionObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(newTransitionObject);

        return newTransitionObject.JointJS();

      }).bind(this), e, A(['flexberry.uml.State', 'flexberry.uml.StateEx', 'flexberry.uml.ComplexTransitionH', 'flexberry.uml.ComplexTransitionV',
      'flexberry.uml.History', 'flexberry.uml.DeepHistory', 'flexberry.uml.StartState', 'flexberry.uml.FinalState', ]));
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
