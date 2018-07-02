import joint from 'npm:jointjs';
import 'ember-flexberry-designer/utils/fd-common-primitives';

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
  attrs: {
    'circle.inner': {
      fill: 'black'
    }
  }
});

joint.shapes.flexberryUml.ObjectFlow = joint.shapes.flexberryUml.Dependency;
