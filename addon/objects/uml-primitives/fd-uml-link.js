/**
  @module ember-flexberry-designer
*/

import FdUmlBaseLink from './fd-uml-baselink';
import joint from 'npm:jointjs';

/**
  An object that defines any link on the UML diagram.

  @class FdUmlLink
  @extends FdUmlPrimitive
*/
export default FdUmlBaseLink.extend({

  /**
    The array of labels for this link.

    @property labels
    @type Array
  */

  JointJS() {
    let properties = this.getProperties('id', 'name', 'source', 'target', 'vertices', 'labels');
    return new Link(properties);
  }
});

export let Link = joint.dia.Link.define('flexberry.uml.Link', {
  attrs: {
    text: { 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' }
  },
  labels: [{
    position: { distance: 0.05, offset: -12 }, attrs: { text: { text: '' } } //endMultiplicity
  }, {
    position: { distance: 0.95, offset: -12 }, attrs: { text: { text: '' } } //startMultiplicity
  }, {
    textAnchor: 'middle', attrs: { text: { text: '' } } //description
  }, {
    position: { distance: 0.05, offset: 12 }, attrs: { text: { text: '' } } //endRoleTxt
  }, {
    position: { distance: 0.95, offset: 12 }, attrs: { text: { text: '' } } //startRoleTxt
  }]
}, {
    setLabelText: function (label, text) {
      console.log(`label: ${label}; text: ${text}`);
      switch (label) {
        case 'startMultiplicity':
          this.label(0, { attrs: { text: { text: text } } });
          break;
        case 'startRole':
          this.label(1, { attrs: { text: { text: text } } });
          break;
        case 'description':
          this.label(2, { attrs: { text: { text: text } } });
          break;
        case 'endRole':
          this.label(3, { attrs: { text: { text: text } } });
          break;
        case 'endMultiplicity':
          this.label(4, { attrs: { text: { text: text } } });
          break;
        default:
          console.log('ERROR - choose correct label name');
          break;
      }

      return;
    },
  });
