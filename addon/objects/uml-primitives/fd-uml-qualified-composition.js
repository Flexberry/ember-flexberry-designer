/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import joint from 'npm:jointjs';
import { isNone } from '@ember/utils';

import FdUmlLink, { Link } from './fd-uml-link';
import { QualifiedView } from './links-view/fd-qualified-view';

/**
  An object that describes a link of the `Qualified Composition` type on the UML diagram.

  @class FdUmlQualifiedComposition
  @extends FdUmlLink
*/
export default FdUmlLink.extend({

  /**
    End role text.

    @property endRoleTxt
    @type String
  */
  endRoleTxt: computed.alias('primitive.RightText.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: computed.alias('primitive.LeftText.Text'),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    return new QualifiedComposition(properties);
  },
});

/**
  Defines the JointJS link, which represents a Qualified Composition in the UML diagram.

  @for FdUmlQualifiedComposition
  @class QualifiedComposition
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let QualifiedComposition = Link.define('flexberry.uml.QualifiedComposition', {
  attrs: {
    '.marker-source': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'url(#solids)' },
    text: { visibility: 'hidden' },
    rect: { visibility: 'hidden' }
  },

  markup: [{
    tagName: 'linearGradient',
    attributes: {'id': 'solids', 'x1': '0%', 'y1': '0%', 'x2': '100%', 'y2': '0%'},
    children: [{
      tagName: 'stop',
      className: 'brush-color',
      attributes: {'offset': '0%', 'style': 'stop-color:rgb(255,255,255);stop-opacity:1'}
    }, {
      tagName: 'stop',
      className: 'brush-color',
      attributes: {'offset': '50%', 'style': 'stop-color:rgb(255,255,255);stop-opacity:1'}
    }, {
      tagName: 'stop',
      className: 'text-color',
      attributes: {'offset': '50%', 'style': 'stop-color:rgb(0,0,0);stop-opacity:1'}
    }, {
      tagName: 'stop',
      className: 'text-color',
      attributes: {'offset': '100%', 'style': 'stop-color:rgb(0,0,0);stop-opacity:1'}
    }]
  }],
}, {

  initialize: function() {
    // called from Backbone constructor
    Link.prototype.initialize.apply(this, arguments);

    // link markup is so complex that we need to fetch its definition
    var markup = (this.markup || this.get('markup'));
    this.set('markup', markup);
  },
  getLabelDistance: function (labelName, isVertical) {
    switch (labelName) {
      case 'qualified':
        return isVertical ? 10 : 5;
      case 'startRole':
        return 55;
      case 'endRole':
        return isVertical ? -10 : -5;
      case 'description':
        return 0.5;
    }
  }
});

joint.shapes.flexberry.uml.QualifiedCompositionView = QualifiedView.extend({
  setColors() {
    QualifiedView.prototype.setColors.apply(this, arguments);

    const brushColor = this.getBrushColor();
    const textColor = this.getTextColor();

    if (!isNone(textColor)) {
      this.model.attr('.marker-source/stroke', textColor);
      this.model.attr('.text-color/style/stop-color', textColor);
    }

    if (!isNone(brushColor)) {
      this.model.attr('.brush-color/style/stop-color', brushColor);
    }
  }
});
