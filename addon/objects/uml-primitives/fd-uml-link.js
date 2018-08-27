/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import FdUmlBaseLink from './fd-uml-baselink';
import joint from 'npm:jointjs';

/**
  An object that defines any link on the UML diagram.

  @class FdUmlLink
  @extends FdUmlPrimitive
*/
export default FdUmlBaseLink.extend({
  JointJS() {
    let properties = this.getProperties('id', 'name', 'source', 'target', 'vertices', 'text');
    return new Link(properties);
  }
});

export let Link = joint.dia.Link.define('flexberry.uml.Link', {
  attrs: {
    text: { 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' }
  },
  labels: [{
    position: { distance: -40, offset: -15 }, attrs: { text: { text: '' } }
  }, {
    position: { distance: -40, offset: 15 }, attrs: { text: { text: '' } }
  }, {
    textAnchor: 'middle', attrs: { text: { text: '' } }
  }, {
    position: { distance: 10, offset: 15 }, attrs: { text: { text: '' } }
  }, {
    position: { distance: 10, offset: -15 }, attrs: { text: { text: '' } }
  }]
}, {
    setLabelText: function (label, text) {
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
