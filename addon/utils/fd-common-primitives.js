import joint from 'npm:jointjs';

joint.shapes.uml.StartState.define('flexberry.uml.StartState', {
  size: { width: 12, height: 12 },
  attrs: {
    circle: { 'fill': 'black', 'stroke': 'black', 'stroke-width': 2, 'rx': 1 },
    text: {
      'ref-x': -5,
      'text-anchor': 'end',
      'y-alignment': 'middle',
      'font-weight':'bold',
      'font-size':'12'
    }
  }
});

joint.dia.Element.define('flexberry.uml.ComplexTransitionHorizon', {
  attrs: {
    polyline: { refPoints: '0,0 10,0', stroke: 'black', 'stroke-width': 2 },
    text: {
      'ref': 'polyline',
      'ref-y': 0,
      'ref-x': 0.99,
      'text-anchor': 'start',
      'y-alignment': 'middle',
      'font-weight': 'bold'
    }
  }
}, {

  markup: [{
    tagName: 'g',
    className: 'rotatable',
    children: [{
      tagName: 'g',
      className: 'scalable',
      children: [{
        tagName: 'polyline'
      }]
    }, {
      tagName: 'text'
    }]
  }],

});

joint.shapes.flexberry.uml.ComplexTransitionHorizon.define('flexberry.uml.ComplexTransitionVertical', {
  attrs: {
    polyline: { refPoints: '0,0 0,10' },
    text: {
      'ref-y': 0.99,
      'ref-x': 0,
      'text-anchor': 'middle',
      'y-alignment': 'start'
    }
  }
});
