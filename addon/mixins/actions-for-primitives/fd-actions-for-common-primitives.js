import Ember from 'ember';
import FdCreatingDiagramElementsMixin from './fd-creating-diagram-elements';
import { Dependency } from '../../objects/uml-primitives/fd-uml-dependency';
import { Note } from '../../objects/uml-primitives/fd-uml-note';
import { NoteConnector } from '../../objects/uml-primitives/fd-uml-note-connector';
/**
  Actions for creating joint js elements on diagrams.

  @class FdAcrionsForCommonPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Ember.Mixin.create(FdCreatingDiagramElementsMixin, {
  actions: {
    /**
      Handler for click on pointerClick button.

      @method actions.pointerClick
     */
    pointerClick() {
      let paper = this.get('paper');
      this._offAllEvents(paper);
    },

    /**
      Handler for click on addDependency button.

      @method actions.addDependency
      @param {jQuery.Event} e event.
     */
    addDependency(e) {
      this.createLinkEvents((function(linkProperties) {
        let newDependencyObject = new Dependency({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newDependencyObject;
      }).bind(this), e, Ember.A(['flexberry.uml.Class', 'flexberry.uml.TemplateClass', 'flexberry.uml.Instance',
       'flexberry.uml.ActiveObject', 'flexberry.uml.PropertyObject', 'flexberry.uml.MultiObject', 'flexberry.uml.Package']));
    },

    /**
      Handler for click on addNote button.

      @method actions.addNote
      @param {jQuery.Event} e event.
     */
    addNote(e) {
      this.createObjectEvents((function(x, y) {
        let newNoteObject = new Note({
          position: { x: x, y: y },
          size: { width: 100, height: 40 },
          name: ''
        });

        return newNoteObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addNoteConnector button.

      @method actions.addNoteConnector
      @param {jQuery.Event} e event.
     */
    addNoteConnector(e) {
      this.createLinkEvents((function(linkProperties) {
        let newNoteConnectorObject = new NoteConnector({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points
        });

        return newNoteConnectorObject;
      }).bind(this), e);
    }
  }
});
