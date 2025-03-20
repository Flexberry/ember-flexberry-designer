import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';
import fdSequenceActor from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-sequence-actor';
import fdSequenceDiagramObject from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-sequence-object';
import fdSequenceDiagramActiveObject from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-sequence-active-object';
import fdInScope from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-sequence-in-scope';
import { Terminator } from '../../objects/uml-primitives/fd-uml-terminator';
import { ProcedureCall } from '../../objects/uml-primitives/fd-uml-procedure-call';
import FlatMessage from '../../objects/uml-primitives/fd-uml-flat-message';
import AsyncMessage from '../../objects/uml-primitives/fd-uml-async-message';
import ReturnMessage from '../../objects/uml-primitives/fd-uml-return-message';
import TimeConstraint from '../../objects/uml-primitives/fd-uml-time-constraint';
import { getJsonForElement, getJsonForLink } from '../../utils/get-json-for-diagram';

/**
  Actions for creating joint js elements on cad diagrams.

  @class FdAcrionsForCadPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  actions: {
    /**
      Handler for click on addSequenceDiagramActor button.

      @method actions.addSequenceDiagramActor
      @param {jQuery.Event} e event.
     */
    addSequenceDiagramActor(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.sd.Actor, UMLSD',
          { x, y },
          { width: 5, height: 60 },
          { Name: '' }
        );
        let sequenceActorObject = fdSequenceActor.create({ primitive: jsonObject });
        this._addToPrimitives(sequenceActorObject);
        return sequenceActorObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addSequenceDiagramObject button.

      @method actions.addSequenceDiagramObject
      @param {jQuery.Event} e event.
     */
    addSequenceDiagramObject(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.sd.InactiveObject, UMLSD',
          { x, y },
          { width: 125, height: 110 },
          { Name: '' }
        );
        let sequenceDiagramObject = fdSequenceDiagramObject.create({ primitive: jsonObject });
        this._addToPrimitives(sequenceDiagramObject);
        return sequenceDiagramObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addSequenceDiagramActiveObject button.

      @method actions.addSequenceDiagramActiveObject
      @param {jQuery.Event} e event.
     */
    addSequenceDiagramActiveObject(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.sd.ActiveObject, UMLSD',
          { x, y },
          { width: 125, height: 110 },
          { Name: '' }
        );
        let sequenceDiagramActiveObject = fdSequenceDiagramActiveObject.create({ primitive: jsonObject });
        this._addToPrimitives(sequenceDiagramActiveObject);
        return sequenceDiagramActiveObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addTerminator button.

      @method actions.addTerminator
      @param {jQuery.Event} e event.
     */
    addTerminator(e) {
      this.createObjectData((function(x, y) {
        let newTerminatorObject = new Terminator({
          position: { x: x, y: y }
        });

        return newTerminatorObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addProcedureCall button.

      @method actions.addProcedureCall
      @param {jQuery.Event} e event.
     */
    addProcedureCall(e) {
      this.createLinkData((function(linkProperties) {
        let newProcedureCallObject = new ProcedureCall({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newProcedureCallObject;
      }).bind(this), e, A(['flexberry.uml.sequencediagramActiveObject', 'flexberry.uml.sequencediagramObject', 'flexberry.uml.SequenceDiagramActor']));
    },

    /**
      Handler for click on addFlatMessage button.

      @method actions.addFlatMessage
      @param {jQuery.Event} e event.
     */
    addFlatMessage(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.sd.FlatMessage, UMLSD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '', LeftText: '', RightText: '' },
          { NamePos: 0.0, InitialMultiplicity: 1.0 }
        );

        let flatMessageObject = FlatMessage.create({ primitive: jsonObject });

        flatMessageObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(flatMessageObject);

        let newFlatMessageObject = flatMessageObject.JointJS();

        return newFlatMessageObject;
      }).bind(this), e, A(['flexberry.uml.sequencediagramActiveObject', 'flexberry.uml.sequencediagramObject', 'flexberry.uml.SequenceDiagramActor']));
    },

    /**
      Handler for click on addAsyncMessage button.

      @method actions.addAsyncMessage
      @param {jQuery.Event} e event.
     */
    addAsyncMessage(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.sd.AsyncMessage, UMLSD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '', LeftText: '', RightText: '' },
          { NamePos: 0.0, InitialMultiplicity: 1.0 }
        );

        let asyncMessageObject = AsyncMessage.create({ primitive: jsonObject });

        asyncMessageObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(asyncMessageObject);

        let newAsyncMessageObject = asyncMessageObject.JointJS();

        return newAsyncMessageObject;
      }).bind(this), e, A(['flexberry.uml.sequencediagramActiveObject', 'flexberry.uml.sequencediagramObject', 'flexberry.uml.SequenceDiagramActor']));
    },

    /**
      Handler for click on addReturnMessage button.

      @method actions.addReturnMessage
      @param {jQuery.Event} e event.
     */
    addReturnMessage(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.sd.ReturnMessage, UMLSD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '', LeftText: '', RightText: '' },
          { NamePos: 0.0, InitialMultiplicity: 1.0 }
        );

        let returnMessageObject = ReturnMessage.create({ primitive: jsonObject });

        returnMessageObject.set('vertices', linkProperties.points || A());
        this._addToPrimitives(returnMessageObject);

        let newReturnMessageObject = returnMessageObject.JointJS();

        return newReturnMessageObject;
      }).bind(this), e, A(['flexberry.uml.sequencediagramActiveObject', 'flexberry.uml.sequencediagramObject', 'flexberry.uml.SequenceDiagramActor']));
    },

    /**
      Handler for click on addInScope button.

      @method actions.addInScope
      @param {jQuery.Event} e event.
     */
    addInScope(e) {
      this.createObjectData((function(x, y, parentPrimitive) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.sd.InScope, UMLSD',
          { x, y },
          { width: 13, height: 36 },
          { Name: '' },
          { ConnectedPrimitive : { $ref: parentPrimitive } }
        );
        let inScope = fdInScope.create({ primitive: jsonObject });
        this._addToPrimitives(inScope);
        
        return inScope.JointJS();
      }).bind(this), e, A(['flexberry.uml.sequencediagramActiveObject', 'flexberry.uml.sequencediagramObject']));
    },

    /**
      Handler for click on addTimeConstraint button.

      @method actions.addTimeConstraint
      @param {jQuery.Event} e event.
     */
    addTimeConstraint(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.sd.TimeConstraint, UMLSD',
          { x, y },
          { width: 80, height: 40 },
          { Name: '' }
        );
        let timeConstraintObject = TimeConstraint.create({ primitive: jsonObject });

        this._addToPrimitives(timeConstraintObject);

        return timeConstraintObject.JointJS();
      }).bind(this), e);
    }
  }
});
