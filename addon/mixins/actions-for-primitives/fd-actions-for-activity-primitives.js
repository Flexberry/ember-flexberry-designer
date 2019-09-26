import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import FdUmlSignalReceipt from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-signal-receipt';
import FdUmlTransition from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-transition';
import FdUmlComplexTransition from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-complex-transition';
import FdUmlSignalSend from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-signal-send';
import FdUmlStartState from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-start-state';
import FdUmlFinalState from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-final-state';
import FdUmlDecision from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-decision';
import FdUmlObjectInState  from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-object-in-state';
import FdUmlActiveState from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-active-state';
import FdUmlPartition from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-partition';
import FdObjectFlow  from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-object-flow';
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
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.Decision, UMLAD',
          { x, y },
          { width: 40, height: 20 },
        );

        let newDecisionObject = FdUmlDecision.create({ primitive: jsonObject });
        this._addToPrimitives(newDecisionObject);
        return newDecisionObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addActiveState button.

      @method actions.addActiveState
      @param {jQuery.Event} e event.
    */
    addActiveState(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.State, UMLAD',
          { x, y },
          { width: 110, height: 90 },
          { Name: '', Text: '' },
        );
        let activeStateObject = FdUmlActiveState.create({ primitive: jsonObject });
        this._addToPrimitives(activeStateObject);
        return activeStateObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addStartState button.

      @method actions.addStartState
      @param {jQuery.Event} e event.
    */
    addStartState(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.StartState, UMLAD',
          { x, y },
          { width: 10, height: 10 },
          { Name: '' },
        );
        let startStateObject = FdUmlStartState.create({ primitive: jsonObject });
        this._addToPrimitives(startStateObject);
        return startStateObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addFinalState button.

      @method actions.addFinalState
      @param {jQuery.Event} e event.
    */
    addFinalState(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.FinalState, UMLAD',
          { x, y },
          { width: 10, height: 10 },
          { Name: '' },
        );
        let finalStateObject = FdUmlFinalState.create({ primitive: jsonObject });
        this._addToPrimitives(finalStateObject);
        return finalStateObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addComplexTransitionH button.

      @method actions.addComplexTransitionH
      @param {jQuery.Event} e event.
    */
    addComplexTransitionH(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.ComplexTransitionH, UMLAD',
          { x, y },
          { width: 40, height: 10 },
          { Name: '' },
        );
        let complexTransitionObject = FdUmlComplexTransition.create({ primitive: jsonObject });
        this._addToPrimitives(complexTransitionObject);
        return complexTransitionObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addComplexTransitionH button.

      @method actions.addComplexTransitionV
      @param {jQuery.Event} e event.
    */
    addComplexTransitionV(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.ComplexTransitionV, UMLAD',
          { x, y },
          { width: 10, height: 40 },
          { Name: '' },
        );
        let complexTransitionObject = FdUmlComplexTransition.create({ primitive: jsonObject });
        this._addToPrimitives(complexTransitionObject);
        return complexTransitionObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addObjectInState button.

      @method actions.addObjectInState
      @param {jQuery.Event} e event.
    */
    addObjectInState(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.ObjectInState, UMLAD',
          { x, y },
          { width: 110, height: 90 },
          { Name: '', Text: '' },
        );
        let objectInStateObject = FdUmlObjectInState.create({ primitive: jsonObject });
        this._addToPrimitives(objectInStateObject);
        return objectInStateObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addSignalReceiptL button.

      @method actions.addSignalReceiptL
      @param {jQuery.Event} e event.
    */
    addSignalReceiptL(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.SignalReceiptLeft, UMLAD',
          { x, y },
          { width: 100, height: 30 },
          { Name: '' },
        );
        let signalReceiptObject = FdUmlSignalReceipt.create({ primitive: jsonObject });
        this._addToPrimitives(signalReceiptObject);
        return signalReceiptObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addSignalReceiptR button.

      @method actions.addSignalReceiptR
      @param {jQuery.Event} e event.
    */
    addSignalReceiptR(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.SignalReceiptRight, UMLAD',
          { x, y },
          { width: 100, height: 30 },
          { Name: '' },
        );
        let signalReceiptObject = FdUmlSignalReceipt.create({ primitive: jsonObject });
        this._addToPrimitives(signalReceiptObject);
        return signalReceiptObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addSignalSendingL button.

      @method actions.addSignalSendingL
      @param {jQuery.Event} e event.
    */
    addSignalSendingL(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.SignalSendLeft, UMLAD',
          { x, y },
          { width: 100, height: 30 },
          { Name: '' },
        );
        let signalSendObject = FdUmlSignalSend.create({ primitive: jsonObject });
        this._addToPrimitives(signalSendObject);
        return signalSendObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addSignalSendingR button.

      @method actions.addSignalSendingR
      @param {jQuery.Event} e event.
    */
    addSignalSendingR(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.SignalSendRight, UMLAD',
          { x, y },
          { width: 100, height: 30 },
          { Name: '' },
        );
        let signalSendObject = FdUmlSignalSend.create({ primitive: jsonObject });
        this._addToPrimitives(signalSendObject);
        return signalSendObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addTransition button.

      @method actions.addTransition
      @param {jQuery.Event} e event.
    */
    addTransition(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.ad.Transition, UMLAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '' },
          { NamePos: 0.0 }
        );

        let transitionObject = FdUmlTransition.create({ primitive: jsonObject });
        transitionObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(transitionObject);

        return transitionObject.JointJS();
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
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.ad.ObjectFlow, UMLAD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '' },
          { NamePos: 0.0 }
        );

        let flowObject = FdObjectFlow.create({ primitive: jsonObject });
        flowObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(flowObject);

        return flowObject.JointJS();
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
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.ad.Partition, UMLAD',
          { x, y },
          { width: 110, height: 90 },
          { Name: ''},
        );
        let partitonObject = FdUmlPartition.create({ primitive: jsonObject });
        this._addToPrimitives(partitonObject);
        return partitonObject.JointJS();
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
          { width: 10, height: 2 },
          { Name: '', ParentObjectID: '' },
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
          { width: 2, height: 10 },
          { Name: '', ParentObjectID: '' },
        );
        let swimlineSeparatorObject = FdUmlSwimlineSeparator.create({ primitive: jsonObject });
        this._addToPrimitives(swimlineSeparatorObject);
        return swimlineSeparatorObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Partition']));
    },
  }
});

