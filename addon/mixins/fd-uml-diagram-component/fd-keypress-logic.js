/**
  @module ember-flexberry-designer
*/

import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

/**
  Mixin with key press logic for fd-uml-diagram component.

  @class FdFormUnsavedData
  @uses <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({

  /**
    Service for managing the state of the component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Subscription on mouseover and keydown.

    @method subscriptionToKeyPress
    @param {Object} paper paper joint js.
  */
  subscriptionToKeyPress(paper) {
    let paperEl = paper.$el;
    paperEl.attr('tabindex', 0);

    paperEl.on('mouseover', this._mouseoverHandler);
    paperEl.on('keydown', this._keydownHandler.bind(this));
  },

  /**
    Handler 'mouseover'.

    @method _mouseoverHandler
  */
  _mouseoverHandler() {
    this.focus();
  },

  /**
    Handler 'keydown'.

    @method _keydownHandler
    @param {Event} e event.
  */
  _keydownHandler(e) {
    e.stopPropagation();
    e.preventDefault();

    if (e.ctrlKey) {
      switch (e.keyCode) {
        // ctrl + a
        case 65:
          this.highlightAllElements();
        break;

        // ctrl + c
        case 67:
        break;

        // ctrl + x
        case 88:
        break;

        // ctrl + v
        case 86:
        break;

        // ctrl + z
        case 90:
        break;

        // ctrl + y
        case 89:
        break;

        // ctrl + s
        case 83:
          this.saveDiagram();
        break;
      }
    } else if (e.keyCode === 46) {
      this.deleteSelectElements();
    }
  },

  /**
    Handler 'ctrl + a' select all diagram elements.

    @method highlightAllElements
  */
  highlightAllElements() {
    let paper = this.get('paper');
    let graph = this.get('graph');
    let cells = graph.getCells();
    cells.forEach((cell) => {
      let cellView = paper.findViewByModel(cell);
      cellView.highlight(null, { highlightAll: true });
    });
  },

  /**
    Handler 'ctrl + s' save open diagram.

    @method saveDiagram
  */
  saveDiagram() {
    let readonly = this.get('readonly');
    if (!readonly) {
      this.get('fdSheetService').saveCurrentItem('diagram-sheet');
    }
  },

  /**
    Handler 'delete' delete selected diagram elements.

    @method deleteSelectElements
  */
  deleteSelectElements() {
    let readonly = this.get('readonly');
    if (readonly) {
      return;
    }

    let highlightedElements = this.get('highlightedElements');
    highlightedElements.forEach((highlightedElement) => {
      highlightedElement.model.remove();
    });

    highlightedElements.clear();
  }
});
