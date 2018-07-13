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

joint.shapes.flexberryUml.Dependency.define('flexberryUml.ObjectFlow', {
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

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.Partition', {
  attrs: { '.flexberry-uml-header-text': { 'font-weight':'bold', 'ref-y': 0, 'y-alignment': 'start' } },
  heightPadding: 60
});
