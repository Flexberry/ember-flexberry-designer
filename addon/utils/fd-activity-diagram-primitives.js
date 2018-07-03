import joint from 'npm:jointjs';
import './fd-common-primitives';

joint.shapes.basic.Generic.define('flexberryUml.SignalReceiptRight', {
  attrs: {
    text: {
      'ref': 'path',
      'font-weight': 'bold',
      'font-size':'12',
      'fill': 'black',
      'font-family': 'Arial',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
    },
    path: {
      'd': 'M200,0 L0,0 L0,50 L200,50 L150,25 L200,0',
      'stroke': 'black',
      'stroke-width': '1',
    },
    rect: {
      'stroke': 'black',
      'stroke-width':'1',
      'fill':'#fff',

    },
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect/>',
    '<path/>',
    '</g>',
    '<text/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberryUml.SignalReceiptRight.define('flexberryUml.SignalReceiptLeft', {
  attrs: {
    path: {
      'd': 'M200,0 L0,0 L50,25 L0,50 L200,50 L200,0'
    }
  }
});

joint.shapes.flexberryUml.SignalReceiptRight.define('flexberryUml.SignalSendingRight', {
  attrs: {
    path: {
      'd': 'M150,0 L0,0 L0,50 L150,50 L200,25 L150,0'
    }
  }
});

joint.shapes.flexberryUml.SignalReceiptRight.define('flexberryUml.SignalSendingLeft', {
  attrs: {
    path: {
      'd': 'M200,0 L50,0 L0,25 L50,50 L200,50 L200,0'
    }
  }
});

joint.shapes.uml.StartState.define('flexberryUml.StartState', {
  size: { width: 12, height: 12 },
  attrs: { circle: { 'fill': 'black', 'stroke': 'black', 'stroke-width': 2, 'rx': 1 } }
});

joint.shapes.uml.EndState.define('flexberryUml.EndState', {
  attrs: { 'circle.inner': { fill: 'black' } }
});

joint.shapes.flexberryUml.ObjectFlow = joint.shapes.flexberryUml.Dependency;

joint.shapes.flexberryUml.Dependency.define('flexberryUml.Transition', {
  attrs: { '.connection': { 'stroke-dasharray': 0 } }
});

joint.shapes.basic.Rhombus.define('flexberryUml.Decision', {
  attrs: { text: { 'display': 'none' } }
});

joint.dia.Element.define('flexberryUml.ComplexTransitionHorizon', {
  attrs:{   
    polyline: { refPoints: '0,0 10,0', stroke: 'black', 'stroke-width': 2 },
    text: { 
      'ref': 'polyline',
      'ref-y': 0,
      'ref-x': 100,
      'text-anchor': 'right',
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
  attrs:{ 
    polyline: { refPoints: '0,0 0,10' },
    text: { 
      'ref-y': 100,
      'ref-x': 0,
      'text-anchor': 'middle',
      'y-alignment': 'right'
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
    this.get('attrs')['text'].text = lines.join('\n');
    return 0;
  }
});

joint.shapes.flexberryUml.ObjectInState.define('flexberryUml.ActiveState', {
  attrs: { 
    'rect': { rx:1, ry:1 },
    'text tspan': { 'text-decoration': 'none' }, 
    'text': { 'font-weight': 'bold'}
  }
},{
  setText: function() {
    let state = this.get('state').length > 0 ? '«' + this.get('state') + '»' : '';
    var lines = [this.get('name'), state];
    this.get('attrs')['text'].text = lines.join('\n');
    return 0;
  }
})