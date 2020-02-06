import Mixin from '@ember/object/mixin';
import { A, isArray } from '@ember/array';
import FdUmlNote from '../../objects/uml-primitives/fd-uml-note';
import FdUmlNoteConnector from '../../objects/uml-primitives/fd-uml-note-connector';
import { getJsonForElement, getJsonForLink } from '../../utils/get-json-for-diagram';

/**
  Actions for creating joint js elements on diagrams.

  @class FdActionsForCommonPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  /**
    Add new object to diagram's primitives.

    @method _addToPrimitives
    @param {Object} umlClass
   */
  _addToPrimitives(umlClass) {
    if (!umlClass) {
      return;
    }

    let primitives = this.get('model.primitives');
    if (isArray(primitives)) {
      primitives.pushObject(umlClass);
    } else {
      this.set('model.primitives', A([ umlClass ]));
    }
  },

  actions: {
    /**
      Handler for click on addNote button.

      @method actions.addNote
      @param {jQuery.Event} e event.
     */
    addNote(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.Common.Note, UMLCommon',
          { x, y },
          { width: 80, height: 20 },
          { Name: '' }
        );
        let noteObject = FdUmlNote.create({ primitive: jsonObject });

        this._addToPrimitives(noteObject);

        return noteObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addNoteConnector button.

      @method actions.addNoteConnector
      @param {jQuery.Event} e event.
     */
    addNoteConnector(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.Common.NoteConnector, UMLCommon',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          null,
          { NamePos: 0.0 },
          undefined,
          {'segmNo': linkProperties.segmNo, 'percent': linkProperties.percent}
        );

        let noteConnectorObject = FdUmlNoteConnector.create({ primitive: jsonObject });
        noteConnectorObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(noteConnectorObject);

        return noteConnectorObject.JointJS();
      }).bind(this), e);
    }
  }
});
