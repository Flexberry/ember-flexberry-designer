import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';
import { Note } from '../../objects/uml-primitives/fd-uml-note';
import { NoteConnector } from '../../objects/uml-primitives/fd-uml-note-connector';
/**
  Actions for creating joint js elements on diagrams.

  @class FdActionsForCommonPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  actions: {
    /**
      Handler for click on addNote button.

      @method actions.addNote
      @param {jQuery.Event} e event.
     */
    addNote(e) {
      this.createObjectData((function(x, y) {
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
      this.createLinkData((function(linkProperties) {
        let newNoteConnectorObject = new NoteConnector({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newNoteConnectorObject;
      }).bind(this), e);
    }
  }
});
