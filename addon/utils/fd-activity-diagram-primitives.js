import joint from 'npm:jointjs';
import './fd-common-primitives';

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.SignalReceiptRight', {
  attrs: {
    text: {
      'ref': 'path',
      'font-weight': 'bold'
    },
    path: {
      'd': 'M 0 0 L 100 0 80 20 100 40 0 40 Z',
    }
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<path class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberryUml.SignalReceiptRight.define('flexberryUml.SignalReceiptLeft', {
  attrs: {
    path: {
      'd': 'M 0 0 L 100 0 100 40 0 40 20 20 Z'
    }
  }
});

joint.shapes.flexberryUml.SignalReceiptRight.define('flexberryUml.SignalSendingRight', {
  attrs: {
    path: {
      'd': 'M 0 0 L 80 0 100 20 80 40 0 40 Z'
    }
  }
});

joint.shapes.flexberryUml.SignalReceiptRight.define('flexberryUml.SignalSendingLeft', {
  attrs: {
    path: {
      'd': 'M 20 0 L 100 0 100 40 20 40 0 20 Z'
    }
  }
});

joint.shapes.uml.StartState.define('flexberryUml.StartState', {
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

joint.shapes.uml.EndState.define('flexberryUml.EndState', {
  attrs: {
    'circle.inner': { fill: 'black' },
    text: {
      'ref':'circle.inner',
      'ref-x': 20,
      'ref-y': 0.5,
      'text-anchor': 'strat',
      'y-alignment': 'middle',
      'fill': 'black',
      'font-weight':'bold',
      'font-size':'12',
      'font-family':'Arial, helvetica, sans-serif'
    }
  }
}, {
  markup: '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g><text/></g>'
});

joint.shapes.flexberryUml.Dependency.define('flexberryUml.ObjectFlow', {
  attrs:{ text: { 'font-size':'12', 'font-family':'Arial, helvetica, sans-serif' } }
}, {
  initialize: function() {
    this.updateLabel();
    joint.shapes.flexberryUml.Dependency.prototype.initialize.apply(this, arguments);
  },

  updateLabel: function() {
    let labelsLen = this.attributes.labels.length;
    if (labelsLen > 0) {
      this.attributes.labels[0].attrs.text.text = '[' + this.attributes.labels[0].attrs.text.text;
      this.attributes.labels[--labelsLen].attrs.text.text = this.attributes.labels[labelsLen].attrs.text.text + ']';
    }
  },
});

joint.shapes.flexberryUml.ObjectFlow.define('flexberryUml.Transition', {
  attrs: { '.connection': { 'stroke-dasharray': 0 } }
});

joint.shapes.basic.Rhombus.define('flexberryUml.Decision', {
  attrs: { text: { 'display': 'none' } }
});

joint.dia.Element.define('flexberryUml.ComplexTransitionHorizon', {
  attrs: {
    polyline: { refPoints: '0,0 10,0', stroke: 'black', 'stroke-width': 2 },
    text: {
      'ref': 'polyline',
      'ref-y': 0,
      'ref-x': 100,
      'text-anchor': 'start',
      'y-alignment': 'middle',
      'font-weight': 'bold'
    }
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<polyline/>',
    '</g>',
    '<text/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberryUml.ComplexTransitionHorizon.define('flexberryUml.ComplexTransitionVertical', {
  attrs: {
    polyline: { refPoints: '0,0 0,10' },
    text: {
      'ref-y': 100,
      'ref-x': 0,
      'text-anchor': 'middle',
      'y-alignment': 'start'
    }
  }
});

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.ObjectInState', {
  attrs: {
    'text tspan': { 'text-decoration': 'underline' },
    'text tspan[x]': { 'font-weight': 'bold', 'text-decoration': 'none' },
  },
  state:[],

}, {
  getObjName: function() {
    let state = this.get('state').length > 0 ? '[' + this.get('state') + ']' : '';
    return [this.get('name'), state];
  }
});

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.ActiveState', {
  attrs: {
    '.flexberry-uml-header-rect': { rx:10, ry:10 },
    'text': { 'font-weight': 'bold' }
  }
}, {
  getObjName: function() {
    let state = this.get('state').length > 0 ? '«' + this.get('state') + '»' : '';
    return [this.get('name'), state];
  }
});
