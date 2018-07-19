import joint from 'npm:jointjs';
import './fd-common-primitives';

joint.shapes.flexberryUml.BaseClass.define('flexberryUml.Class', {
  attrs: {
    '.flexberry-uml-header-text': { 'font-weight': 'bold' },
    '.flexberry-uml-header-text tspan[x]': { 'font-weight': 'normal' },
  },
  stereotype:[],

}, {
  getClassName: function() {
    return [this.get('name'), this.get('stereotype')];
  }
});

joint.shapes.flexberryUml.Class.define('flexberryUml.ClassCollapsed', {
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberryUml.BaseClass.define('flexberryUml.Object', {
  attrs: {
    '.flexberry-uml-header-text': {
      'text-decoration': 'underline'
    },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-body-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-body-text"/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberryUml.Class.define('flexberryUml.TemplateClass', {
  attrs: {
    '.flexberry-uml-params-rect': {
      'stroke': 'black', 'stroke-width': 1,
      'stroke-dasharray': '7 2',
      'fill': 'white',
    },

    '.flexberry-uml-params-text': {
      'ref': '.flexberry-uml-params-rect',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'font-weight': 'bold',
      'fill': 'black',
      'font-size': 12,
      'font-family': 'Arial'
    },
  },

  params:[],
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-params-rect"/>',
    '<rect class="flexberry-uml-body-rect"/><rect class="flexberry-uml-footer-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-params-text"/>',
    '<text class="flexberry-uml-body-text"/><text class="flexberry-uml-footer-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    joint.shapes.flexberryUml.Class.prototype.updateRectangles.apply(this, arguments);

    var attrs = this.get('attrs');

    let params = this.get('params');
    let lines = Array.isArray(params) ? params : [params];

    let maxStringChars = 0;
    lines.forEach(function(line) {
      if (line.length > maxStringChars) {
        maxStringChars = line.length;
      }
    });

    let rectHeight = lines.length * 12 + 10;
    let rectWidth = maxStringChars * 8 + 10;

    attrs['.flexberry-uml-params-text'].text = lines.join('\n');
    attrs['.flexberry-uml-params-rect'].height = rectHeight;
    attrs['.flexberry-uml-params-rect'].width = rectWidth;

    let topTranslate = -rectHeight + 5;
    attrs['.flexberry-uml-params-rect'].transform = 'translate(160, ' + topTranslate + ' )';

    let newHeight = this.size().height + attrs['.flexberry-uml-params-rect'].height;
    let newWidth = this.size().width + attrs['.flexberry-uml-params-rect'].width;

    this.resize(newWidth, newHeight);
  }
});

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.NAryAssociation', {
  attrs: {
    text: {
      'text-decoration': 'underline',
      'font-size':'12'
    },
    path: {
      'd': 'M 0 20 L 50 0 100 20 50 40 Z',
    }
  },
  heightPadding: 40,
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<path class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),
});

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.Instance', {
  attrs: {
    text: {
      'text-decoration': 'underline',
    }
  }
});

joint.shapes.flexberryUml.Instance.define('flexberryUml.ActiveObject', {
  attrs: {
    text: {
      'font-weight':'bold'
    }
  }
});

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.MultiObject', {
  attrs: {
    text: {
      'text-decoration': 'underline',
      'font-size':'12'
    },
    '.back-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' }
  }
}, {

  updateRectangles: function() {
    joint.shapes.flexberryUml.BaseObject.prototype.updateRectangles.apply(this, arguments);

    let attrs = this.get('attrs');
    let backRectTransY = 6;
    attrs['.back-rect'].transform = 'translate(3, ' + backRectTransY + ')';
    attrs['.back-rect'].height = this.size().height;
    attrs['.back-rect'].width = this.size().width;

    let newWidth = this.size().width;
    let newHeight = this.size().height + backRectTransY;
    this.resize(newWidth, newHeight);
  },

  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="back-rect"/><rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

});

joint.dia.Link.define('flexberryUml.BaseLink', {
  labels: [{
    position: { distance: 10, offset: -15 }, attrs: { text: { text:  '*' } } }, {
    position: { distance: 10, offset: 15 }, attrs: { text: { text:  '', 'text-anchor':'start' } } }, {
    position: { distance: -40, offset: 15 }, attrs: { text: { text:  '', 'text-anchor':'end' } } }, {
    position: { distance: -40, offset: -15 }, attrs: { text: { text:  '1' } }
  }]
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.Aggregation', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' } },
});

joint.dia.Link.define('flexberryUml.Qualified', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 z', fill: 'white' } },
  labels: [{
    position: { distance: 10, offset: 15 }, attrs: { text: { text:  '', 'text-anchor':'start' } } }, {
    position: { distance: -40, offset: 15 }, attrs: { text: { text:  '', 'text-anchor':'end' } } }, {
  }]
});

joint.shapes.flexberryUml.Qualified.define('flexberryUml.QualifiedAggregation', {
  attrs: {
    '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'white' }
  },
});

joint.shapes.flexberryUml.Qualified.define('flexberryUml.QualifiedComposition', {
  attrs: {
    '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'url(#solids)' }
  },
}, {

  initialize: function() {
    // called from Backbone constructor
    // call base initialize()
    joint.dia.Link.prototype.initialize.apply(this, arguments);

    // link markup is so complex that we need to fetch its definition
    var markup = (this.markup || this.get('markup'));

    // append <linearGradient> to markup, so that it covers whole path
    markup += '<linearGradient id="solids" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
      '<stop offset="50%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
      '<stop offset="50%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' +
      '<stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' +
      '</linearGradient>';
    this.set('markup', markup);
  }
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.Composition', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' } }
});

joint.dia.Link.define('flexberryUml.Realization', {
  attrs: {
    '.marker-target': { d: 'M 0 0 z' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
  },
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.Association', {
});

joint.dia.Link.define('flexberryUml.Generalization', {
  attrs: { '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' } }
});

joint.dia.Link.define('flexberryUml.NestedClassAssociation', {
  attrs: { '.marker-target': { d: 'M 10, 10 ' +
                'm -8, 0 ' +
                'a 8,8 0 1,0 16,0 ' +
                'a 8,8 0 1,0 -16,0 M 10 2 L 10 2 L 10 18', fill: 'transparent' } }
});

joint.shapes.basic.Generic.define('flexberryUml.MoreClasses', {
  size: { width: 50, height: 10 },
  attrs: {
    circle: { fill: 'black', r:'10' },
  },
}, {
  markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<circle/><circle transform="translate(40,0)"/><circle transform="translate(80,0)"/>',
      '</g>',
      '</g>'
  ].join(''),
});

joint.shapes.flexberryUml.BaseClass.define('flexberryUml.Package', {
  attrs: {
    '.flexberry-uml-header-text': {
      'text-decoration': 'underline',
      'font-weight': 'normal'
    },
    '.flexberry-uml-body-text': {
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle'
    },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<g transform="scale(0.8,1)"><rect class="flexberry-uml-header-rect" /></g><rect class="flexberry-uml-body-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-body-text"/>',
    '</g>'
  ].join(''),
});
