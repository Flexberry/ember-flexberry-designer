/**
  @module ember-flexberry-designer
*/
import { computed } from '@ember/object';
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Link } from './fd-uml-link';
import { EmptyView } from './links-view/fd-empty-view';

/**
  An object that describes a Flat Message on the UML diagram.

  @class FdUmlFlatMsg
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    End role text.

    @property startRoleTxt
    @type String
  */

  endRoleTxt: computed.alias('primitive.LeftText.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: computed.alias('primitive.RightText.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'labels');
    properties.objectModel = this;
    return new FlatMessage(properties);
  },
});

/**
  Defines the JointJS link, which represents a Flat Message in the UML diagram.

  @for FdUmlFlatMsg
  @class FlatMessage
  @extends flexberry.uml.Link
  @namespace flexberry.uml
  @constructor
*/
export let FlatMessage = Link.define('flexberry.uml.sequencediagramFlatMessage', {
  attrs: {
    '.marker-source': { d: 'M 0 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    '.connection': { stroke: 'black', 'stroke-width': 1 }
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
        // eslint-disable-next-line no-console
        console.log('ERROR - choose correct label name');
        break;
    }

    return;
  }
});

joint.shapes.flexberry.uml.FlatMessageView = EmptyView;
