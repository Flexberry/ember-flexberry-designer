import joint from 'npm:jointjs';
import './fd-common-primitives';

joint.shapes.flexberry.uml.BaseObject.define('flexberry.uml.SignalReceiptRight', {
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

joint.shapes.flexberry.uml.SignalReceiptRight.define('flexberry.uml.SignalReceiptLeft', {
  attrs: {
    path: {
      'd': 'M 0 0 L 100 0 100 40 0 40 20 20 Z'
    }
  }
});

joint.shapes.flexberry.uml.SignalReceiptRight.define('flexberry.uml.SignalSendingRight', {
  attrs: {
    path: {
      'd': 'M 0 0 L 80 0 100 20 80 40 0 40 Z'
    }
  }
});

joint.shapes.flexberry.uml.SignalReceiptRight.define('flexberry.uml.SignalSendingLeft', {
  attrs: {
    path: {
      'd': 'M 20 0 L 100 0 100 40 20 40 0 20 Z'
    }
  }
});

joint.shapes.flexberry.uml.Dependency.define('flexberry.uml.ObjectFlow', {
}, {
  initialize: function() {
    this.updateLabel();
    joint.shapes.flexberry.uml.Dependency.prototype.initialize.apply(this, arguments);
  },

  updateLabel: function() {
    let labelsLen = this.attributes.labels.length;
    if (labelsLen > 0) {
      this.attributes.labels[0].attrs.text.text = '[' + this.attributes.labels[0].attrs.text.text;
      this.attributes.labels[--labelsLen].attrs.text.text = this.attributes.labels[labelsLen].attrs.text.text + ']';
    }
  },
});

joint.shapes.flexberry.uml.ObjectFlow.define('flexberry.uml.Transition', {
  attrs: { '.connection': { 'stroke-dasharray': 0 } }
});

joint.shapes.flexberry.uml.BaseObject.define('flexberry.uml.ObjectInState', {
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


joint.shapes.flexberry.uml.BaseObject.define('flexberry.uml.Partition', {
  attrs: { '.flexberry-uml-header-text': { 'font-weight':'bold', 'ref-y': 0, 'y-alignment': 'start' } },
  heightPadding: 60
});
