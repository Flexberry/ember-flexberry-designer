import Ember from 'ember';
import { SequenceDiagramActor } from '../../objects/uml-primitives/fd-uml-sequence-actor';
import { SequenceDiagramObject } from '../../objects/uml-primitives/fd-uml-sequence-object';
import { SequenceDiagramActiveObject } from '../../objects/uml-primitives/fd-uml-sequence-active-object';
import { Terminator } from '../../objects/uml-primitives/fd-uml-terminator';
import { ProcedureCall } from '../../objects/uml-primitives/fd-uml-procedure-call';
import { FlatMessage } from '../../objects/uml-primitives/fd-uml-flat-message';
import { AsyncMessage } from '../../objects/uml-primitives/fd-uml-async-message';
import { ReturnMessage } from '../../objects/uml-primitives/fd-uml-return-message';

/**
  Actions for creating joint js elements on cad diagrams.

  @class FdAcrionsForCadPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create({
  actions: {
    /**
      Handler for click on addSequenceDiagramActor button.

      @method actions.addSequenceDiagramActor
      @param {jQuery.Event} e event.
     */
    addSequenceDiagramActor(e) {
      this.createObjectData((function(x, y) {
        let newSequenceDiagramActorObject = new SequenceDiagramActor({
          position: { x: x, y: y }
        });

        return newSequenceDiagramActorObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addSequenceDiagramObject button.

      @method actions.addSequenceDiagramObject
      @param {jQuery.Event} e event.
     */
    addSequenceDiagramObject(e) {
      this.createObjectData((function(x, y) {
        let newSequenceDiagramObjectObject = new SequenceDiagramObject({
          position: { x: x, y: y }
        });

        return newSequenceDiagramObjectObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addSequenceDiagramActiveObject button.

      @method actions.addSequenceDiagramActiveObject
      @param {jQuery.Event} e event.
     */
    addSequenceDiagramActiveObject(e) {
      this.createObjectData((function(x, y) {
        let newSequenceDiagramActiveObject = new SequenceDiagramActiveObject({
          position: { x: x, y: y }
        });

        return newSequenceDiagramActiveObject;
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
          vertices: linkProperties.points
        });

        return newProcedureCallObject;
      }).bind(this), e, Ember.A(['flexberry.uml.sequencediagramActiveObject', 'flexberry.uml.sequencediagramObject', 'flexberry.uml.SequenceDiagramActor']));
    },

    /**
      Handler for click on addFlatMessage button.

      @method actions.addFlatMessage
      @param {jQuery.Event} e event.
     */
    addFlatMessage(e) {
      this.createLinkData((function(linkProperties) {
        let newFlatMessageObject = new FlatMessage({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newFlatMessageObject;
      }).bind(this), e, Ember.A(['flexberry.uml.sequencediagramActiveObject', 'flexberry.uml.sequencediagramObject', 'flexberry.uml.SequenceDiagramActor']));
    },

    /**
      Handler for click on addAsyncMessage button.

      @method actions.addAsyncMessage
      @param {jQuery.Event} e event.
     */
    addAsyncMessage(e) {
      this.createLinkData((function(linkProperties) {
        let newAsyncMessageObject = new AsyncMessage({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newAsyncMessageObject;
      }).bind(this), e, Ember.A(['flexberry.uml.sequencediagramActiveObject', 'flexberry.uml.sequencediagramObject', 'flexberry.uml.SequenceDiagramActor']));
    },

    /**
      Handler for click on addReturnMessage button.

      @method actions.addReturnMessage
      @param {jQuery.Event} e event.
     */
    addReturnMessage(e) {
      this.createLinkData((function(linkProperties) {
        let newReturnMessageObject = new ReturnMessage({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newReturnMessageObject;
      }).bind(this), e, Ember.A(['flexberry.uml.sequencediagramActiveObject', 'flexberry.uml.sequencediagramObject', 'flexberry.uml.SequenceDiagramActor']));
    },

    /**
      Handler for click on addInScope button.

      @method actions.addInScope
      @param {jQuery.Event} e event.
     */
    addInScope() {
      // TODO need create object.
    },

    /**
      Handler for click on addTimeConstraint button.

      @method actions.addTimeConstraint
      @param {jQuery.Event} e event.
     */
    addTimeConstraint() {
      // TODO need create object.
    }
  }
});
