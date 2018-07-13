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
