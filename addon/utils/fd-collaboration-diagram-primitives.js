import joint from 'npm:jointjs';
import './fd-common-primitives';

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.CollDesignPattern', {
  attrs: {
    '.flexberry-uml-header-rect': { 'rx': '120', 'ry': '120', 'stroke': 'black', 'strokeDasharray': '10,2', 'strokeWidth': '1', 'fill': '#ffffff' }
  }
});

joint.dia.Link.define('flexberryUml.CollPatternConnect', {
  attrs: {
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '3 2' },
  },
  labels: [{
    position: { distance: 50 }, attrs: { text: { text: '' } }
  }]
});

joint.dia.Link.define('flexberryUml.CollInheritance', {
  attrs: {
    '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' }
  },
  labels: [{
    position: { distance: -80 }, attrs: { text: { text: '' } }
  }]
});

joint.shapes.basic.Generic.define('flexberryUml.CollMessageBase', {
  attrs: {
    '.line': {
      'stroke': 'black',
      'strokeWidth': '1',
      'fill': '#ffffff',
      'd':'M0,0 L 60,0'
    },

    '.arrow': {
      'ref':'.line',
      'stroke': 'black',
      'stroke-width':'1',
    },

    '.uml-base-text': {
      'ref': '.line',
      'textAnchor': 'middle',
      'yAlignment': 'middle',
      'fontWeight': 'bold',
      'refY': 20,
      'refX': 30,
      'fill': 'black',
      'fontSize': 12,
      'fontFamily': 'Arial',
    }
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '</g>',
    '<path class="line"/>',
    '<text class="uml-base-text"/>',
    '<path class="arrow"/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberryUml.CollMessageBase.define('flexberryUml.CollAsyncMsgBack', {
  attrs: {
    '.arrow': {
      'd':'M 0 0 L 5 -5'
    },

    '.uml-base-text': {
      'text': 'Async message back'
    }
  }
});

joint.shapes.flexberryUml.CollMessageBase.define('flexberryUml.CollAsyncMsgForward', {
  attrs: {
    '.arrow': {
      'd': 'M 5 0 L 0 -5',
      'refX': 55
    },

    '.uml-base-text': {
      'text': 'Async message forward'
    }
  }
});

joint.shapes.flexberryUml.CollMessageBase.define('flexberryUml.CollFlatMsgForward', {
  attrs: {
    '.arrow': {
      'd': 'M 5 0 L 0 -5 L 5 0 L 0 5',
      'refX': 55,
    },

    '.uml-base-text': {
      'text': 'Flat message forward'
    }
  }
});

joint.shapes.flexberryUml.CollMessageBase.define('flexberryUml.CollFlatMsgBack', {
  attrs: {
    '.arrow': {
      'd': 'M -5 0 L 0 -5 L -5 0 L 0 5',
      'refX': 5
    },

    '.uml-base-text': {
      'text': 'Flat message back'
    }
  }
});

joint.shapes.flexberryUml.CollMessageBase.define('flexberryUml.CollNestedMsgForward', {
  attrs: {
    '.arrow': {
      'd': 'M -15 0 L 0 5 L -15 10 z',
      'fill': 'black',
      'refX': 60,
      'refY': -5
    },

    '.uml-base-text': {
      'text': 'Nested message forward'
    }
  }
});

joint.shapes.flexberryUml.CollMessageBase.define('flexberryUml.CollNestedMsgBack', {
  attrs: {
    '.arrow': {
      'd': 'M 15 0 L 0 5 L 15 10 z',
      'fill': 'black',
      'refY': -5
    },

    '.uml-base-text': {
      'text': 'Nested message back'
    }
  }
});
