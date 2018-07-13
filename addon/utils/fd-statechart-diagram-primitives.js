import joint from 'npm:jointjs';
import './fd-common-primitives';

joint.shapes.flexberryUml.statechartDiagram_EventMessage = joint.shapes.flexberryUml.Dependency;

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.statechartDiagram_State', {
  attrs: {
    '.flexberry-uml-header-rect': { rx:10, ry:10 },
    'text': { 'font-weight': 'bold' }
  }
});

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.statechartDiagram_Class', {
  attrs: {
    'text': { 'font-weight': 'bold' }
  }
});

joint.shapes.flexberryUml.Dependency.define('flexberryUml.statechartDiagram_Transition', {
  attrs: { '.connection': { 'stroke-dasharray': 0 } }
});

joint.shapes.flexberryUml.BaseClass.define('flexberryUml.statechartDiagram_StateEx', {
  attrs: {
    '.flexberry-uml-header-rect': { d:'M 0 10 Q 0 0 10 0 L 90 0 Q 100 0 100 10 L 100 10 100 40 0 40 Z' },
    '.flexberry-uml-body-rect': { d:'M 0 0 L 100 0 100 30 Q 100 40 90 40 L 10 40 Q 0 40 0 30 Z' },
    '.flexberry-uml-body-text': { 'ref-x': 0.5, 'text-anchor': 'middle', d:'M 0 0 L 100 0 100 30 Q 100 40 90 40 L 10 40 Q 0 40 0 30 Z' },
    'text': { 'font-weight': 'bold' }
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<path class="flexberry-uml-header-rect"/><path class="flexberry-uml-body-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-body-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    joint.shapes.flexberryUml.Class.prototype.updateRectangles.apply(this, arguments);

    let attrs = this.get('attrs');
    let rectHeight = attrs['.flexberry-uml-header-rect'].height;
    attrs['.flexberry-uml-header-rect'].d = `M 0 10 Q 0 0 10 0 L 90 0 Q 100 0 100 10 L 100 10 100 ${rectHeight} 0 ${rectHeight} Z`;

    rectHeight = attrs['.flexberry-uml-body-rect'].height;
    let leftBottomCurve = ` Q 0 ${rectHeight} 0 ${rectHeight - 10}`;
    let rightBottomCurve = ` Q 100 ${rectHeight} 90 ${rectHeight}`;
    attrs['.flexberry-uml-body-rect'].d = `M 0 0 L 100 0 100 ${rectHeight - 10} ${rightBottomCurve} L 10 ${rectHeight} ${leftBottomCurve} Z`;
  }
});

joint.shapes.basic.Circle.define('flexberryUml.statechartDiagram_History', {
  attrs: { text: { 'text': 'H', 'font-family':'Times New Roman', 'font-size': '12' } },
  size: { width: 20, height: 20 }
});

joint.shapes.flexberryUml.statechartDiagram_History.define('flexberryUml.statechartDiagram_DeepHistory', {
  attrs: { text: { 'text': 'H*' } }
});

joint.shapes.flexberryUml.statechartDiagram_StateEx.define('flexberryUml.statechartDiagram_CompositeState', {
  attrs: { '.flexberry-uml-body-text': { 'font-weight':'bold', 'ref-y': 0, 'y-alignment': 'start' } }
});

// Deployment diagram
joint.shapes.flexberryUml.BaseObject.define('flexberryUml.deploymentDiagram_Component', {
  attrs: {
    'text': { 'font-weight': 'bold' },
    '.firstRect': { 'y-alignment': 'middle', 'ref-y': 0.5, 'fill': 'white', 'stroke': 'black', 'stroke-width': 1 },
    '.secondRect': { 'y-alignment': 'middle', 'ref-y': 0.5, 'fill': 'white', 'stroke': 'black', 'stroke-width': 1 }
  },
  heightPadding: 20
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '<rect class="firstRect" width="10" height="5"/>',
    '<rect class="secondRect" width="10" height="5"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    joint.shapes.flexberryUml.BaseObject.prototype.updateRectangles.apply(this, arguments);

    let attrs = this.get('attrs');
    attrs['.firstRect'].transform = 'translate(-5, -8)';
    attrs['.secondRect'].transform = 'translate(-5, 8)';
  }
});

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.deploymentDiagram_Node', {
  attrs: {
    'text': { 'font-weight': 'bold' },
    '.back-path': { 'd': 'M 0 5 L 5 0 100 0 100 45 95 50 M 95 5 L 100 0', 'fill': 'white', 'stroke': 'black', 'stroke-width': 1 }
  },
  heightPadding: 20
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<path class="back-path"/><rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    joint.shapes.flexberryUml.BaseObject.prototype.updateRectangles.apply(this, arguments);

    let attrs = this.get('attrs');
    let offset = 5;
    attrs['.back-path'].transform = `translate(0, ${-offset})`;

    let rectWidth = this.size().width;
    let rectHeight = this.size().height;
    let backPathWidth = rectWidth + offset;
    let backPathHeight = rectHeight + offset;
    let backPathLine1 = `L ${offset} 0 ${backPathWidth} 0`;
    let backPathLine2 = `L ${backPathWidth} ${rectHeight} ${rectWidth} ${backPathHeight}`;
    let backPathMove = `M ${rectWidth} ${offset} L ${backPathWidth} 0`;

    attrs['.back-path'].d = `M 0 ${offset} ${backPathLine1} ${backPathLine2} ${backPathMove}`;

    let newWidth = this.size().width + offset;
    let newHeight = this.size().height + offset;
    this.resize(newWidth, newHeight);
  },
});

joint.shapes.basic.Generic.define('flexberryUml.deploymentDiagram_Interface', {
  attrs: {
    size: { 'width': 24, 'height': 47 },
    link: undefined,
    linklength: 20,
    endLine: undefined
  },
  name: [],
}, {
  markup: '<g class="rotatable"><g class="scalable"></g></g>',
  initialize: function () {
    this.attributes.endLine = new joint.shapes.basic.Circle({
      size: { width: 6, height: 6 }
    });
    let sourceObj = this.get('sourceObj');
    this.attributes.link = new joint.shapes.standard.Link({
      source: { id: sourceObj.id, anchor: { name: 'perpendicular' } },
      target: { id: this.attributes.endLine.cid },
      labels:[{
        attrs: {
          text: {
            text: this.get('name').join('\n'),
            textAnchor:'start',
            yAlignment: 'middle',
            fontWeight: 'bold',
            fontSize: '12',
            fontFamily: 'Arial'
          }
        },
        position: { distance: 10, offset: -10 },
      }],
    });
    let linklength = this.attributes.attrs.linklength;
    this.attributes.link.markup = '<path class="connection" stroke="black" ' +
      'stroke-width="1" d="M 0 0 0 0"/>';
    let shift = 3;
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    this.addTo(this.attributes.graph);

    this.attributes.endLine.addTo(this.attributes.graph);
    this.embed(this.attributes.endLine);
    this.attributes.endLine.position(-shift, linklength, { parentRelative: true });
    this.embed(this.attributes.endLine);

    let _this = this;
    this.attributes.endLine.on('change:position', function(element, position) {
      if (element._pending.tx === undefined) {
        element.position(position.x, position.y);
        return;
      }

      let x1 = sourceObj.position().x;
      let x2 = x1 + sourceObj.size().width;
      let y1 = sourceObj.position().y;
      let y2 = y1 + sourceObj.size().height;
      let beforePositionX = position.x - element._pending.tx;
      let beforePositionY = position.y - element._pending.ty;
      let posCenterX = position.x + shift;
      let posCenterY = position.y + shift;

      function move(pos, p1, p2, d, newX, newY, ort=false) {
        if (pos >= p1 + shift) {
          if (pos <= p2 - shift) {
            element.position(newX, newY);
          } else if (pos < p2) {
            if (ort) {
              element.position(d, p2 + linklength);
            } else {
              element.position(p2 + linklength, d);
            }
          }
        } else if (pos < p1) {
          if (ort) {
            element.position(d, p1 - linklength);
          } else {
            element.position(p1 - linklength, d);

          }
        }
      }

      if (posCenterY > y2) {
        move(posCenterX, x1, x2, y2 - shift * 2, position.x, beforePositionY);
      } else if (posCenterY < y1 && posCenterX < x2 && posCenterX + 2 > x1) {
        move(posCenterX, x1, x2, y1, position.x, beforePositionY);
      } else if (posCenterX > x2) {
        move(posCenterY, y1, y2, x2 - shift * 2, beforePositionX, position.y, true);
      } else if (posCenterX < x1) {
        move(posCenterY, y1, y2, x1, beforePositionX, position.y, true);
      }
    });

    sourceObj.on('change:position', function(element) {
      let endLinePosition = _this.attributes.endLine.position();
      _this.attributes.endLine.position(endLinePosition.x + element._pending.tx, endLinePosition.y + element._pending.ty);
    });

    this.attributes.link.on('change:vertices', function(element) {
      element.vertices([]);
    });

    this.attributes.link.addTo(this.attributes.graph);
    this.embed(this.attributes.link);
  }
});

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.deploymentDiagram_Object', {
  attrs: {
    text: { 'text-decoration': 'underline' }
  }
});

joint.shapes.flexberryUml.deploymentDiagram_Object.define('flexberryUml.deploymentDiagram_ActiveObject', {
  attrs: {
    '.flexberry-uml-header-rect': { 'stroke-width': 2 },
    text: { 'font-weight':'bold' }
  }
});
