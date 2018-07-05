import joint from 'npm:jointjs';
import './fd-common-primitives';

joint.shapes.basic.Path.define('flexberryUml.SignalReceiptRight', {
  attrs: {
    text: {
      'ref': 'path',
      'font-weight': 'bold',
      'font-size':'12',
      'fill': 'black',
      'font-family': 'Arial, helvetica, sans-serif',
      'ref-y': 0.5,
      'ref-x': 0.5, 
      'y-alignment': 'middle', 
      'text-anchor':"middle",
      'ref-dy': null
    },
    path: {
      'd': 'M 0 0 L 100 0 80 20 100 40 0 40 Z',
      'stroke': 'black',
      'stroke-width': '1',
    }
  }
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
},{
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

joint.shapes.basic.Generic.define('flexberryUml.ObjectInState', {
  attrs: {
    rect: {
      'stroke': 'black',
      'stroke-width':'1',
      'fill':'#fff',
    },

    text: {
      'ref': 'rect',
      'fill': 'black',
      'font-size': 12,
      'font-family': 'Arial',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle'
    },

    'text tspan': { 'text-decoration': 'underline' },
    'text tspan[x]': { 'font-weight': 'bold', 'text-decoration': 'none' },
  },
  state:[],

}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect width="10" height="10"/>',
    '</g>',
    '<text/>',
    '</g>'
  ].join(''),

  initialize: function() {
    this.setText();
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  setText: function() {
    let state = this.get('state').length > 0 ? '[' + this.get('state') + ']' : '';
    var lines = [this.get('name'), state];
    this.get('attrs').text.text = lines.join('\n');
    return 0;
  }
});

joint.shapes.flexberryUml.ObjectInState.define('flexberryUml.ActiveState', {
  attrs: {
    'rect': { rx:1, ry:1 },
    'text tspan': { 'text-decoration': 'none' },
    'text': { 'font-weight': 'bold' }
  }
}, {
  setText: function() {
    let state = this.get('state').length > 0 ? '«' + this.get('state') + '»' : '';
    var lines = [this.get('name'), state];
    this.get('attrs').text.text = lines.join('\n');
    return 0;
  }
});
