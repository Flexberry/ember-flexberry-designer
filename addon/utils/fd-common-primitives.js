import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberryUml.BaseObject', {
  attrs: {
    // rect: { 'width': 100 },

    '.flexberry-uml-header-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },

    '.flexberry-uml-header-text': {
      'ref': '.flexberry-uml-header-rect',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'fill': 'black',
      'fontSize': 12,
      'font-family': 'Arial'
    }
  },
  name: [],
  heightPadding: 10,
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '</g>'
  ].join(''),

  initialize: function() {

    this.on('change:name change:attributes change:methods', function() {
      this.updateRectangles();
      this.trigger('uml-update');
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getObjName: function() {
    return this.get('name');
  },

  updateRectangles: function() {
    let attrs = this.get('attrs');
    let objName = this.getObjName();
    let lines = Array.isArray(objName) ? objName : [objName];

    let maxStringChars = 0;
    lines.forEach(function(line) {
      if (line.length > maxStringChars) {
        maxStringChars = line.length;
      }
    });

    let hightStep = attrs['.flexberry-uml-header-text'].fontSize;
    let rectHeight = lines.length * hightStep + this.get('heightPadding');

    let widthStep = attrs['.flexberry-uml-header-text'].fontSize / 1.5;
    let rectWidth = maxStringChars * widthStep  + 10;

    attrs['.flexberry-uml-header-text'].text = lines.join('\n');
    attrs['.flexberry-uml-header-rect'].height = rectHeight;
    attrs['.flexberry-uml-header-rect'].width = rectWidth;

    this.resize(rectWidth, rectHeight);
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
  ].join('')
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

joint.shapes.flexberryUml.BaseObject.define('flexberryUml.Note', {
  attrs: {
    '.flexberry-uml-header-text': {
      'font-weight': 'bold',
      'ref-y': 0,
      'ref-x': 0,
      'text-anchor': 'start',
      'y-alignment': 'start',
    },
    '.corner-rect': {
      'ref':'.flexberry-uml-header-rect',
      'stroke': 'white',
      'stroke-width':'2'
    },
    '.corner': {
      'ref':'.flexberry-uml-header-rect',
      'stroke': 'black',
      'stroke-width':'1',
      'd':'M0,0 L0,10 L10,10 L0,0'
    },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/>',
    '<rect class="corner-rect" width="10" height="10"/>',
    '<path class="corner"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    joint.shapes.flexberryUml.BaseObject.prototype.updateRectangles.apply(this, arguments);

    let attrs = this.get('attrs');
    let transX = this.size().width - 10;
    attrs['.corner-rect'].transform = 'translate(' + transX + ', 0)';
    attrs['.corner'].transform = 'translate(' + transX + ', 0)';
  }
});

joint.shapes.basic.Generic.define('flexberryUml.BaseClass', {
  attrs: {
    rect: { 'width': 200 },

    '.flexberry-uml-header-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },
    '.flexberry-uml-body-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },
    '.flexberry-uml-footer-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },

    '.flexberry-uml-header-text': {
      'ref': '.flexberry-uml-header-rect',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'fill': 'black',
      'fontSize': 12,
      'font-family': 'Arial'
    },
    '.flexberry-uml-body-text': {
      'ref': '.flexberry-uml-body-rect', 'ref-y': 5, 'ref-x': 5,
      'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
    },
    '.flexberry-uml-footer-text': {
      'ref': '.flexberry-uml-footer-rect', 'ref-y': 5, 'ref-x': 5,
      'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
    }
  },

  name: [],
  attributes: [],
  methods: []
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-body-rect"/><rect class="flexberry-uml-footer-rect"/>',
    '</g>',
    '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-body-text"/><text class="flexberry-uml-footer-text"/>',
    '</g>'
  ].join(''),

  initialize: function() {

    this.on('change:name change:attributes change:methods', function() {
      this.updateRectangles();
      this.trigger('uml-update');
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getClassName: function() {
    return this.get('name');
  },

  updateRectangles: function() {

    var attrs = this.get('attrs');

    var rects = [
        { type: 'header', text: this.getClassName() },
        { type: 'body', text: this.get('attributes') },
        { type: 'footer', text: this.get('methods') }
    ];

    let offsetY = 0;
    let newHeight = 0;
    let newWidth = 0;
    let _this = this;
    rects.forEach(function(rect) {
      if (_this.markup.includes('flexberry-uml-' + rect.type + '-rect')) {

        let lines = Array.isArray(rect.text) ? rect.text : [rect.text];

        let maxStringChars = 0;
        lines.forEach(function(line) {
          if (line.length > maxStringChars) {
            maxStringChars = line.length;
          }
        });

        let hightStep = attrs['.flexberry-uml-header-text'].fontSize;
        let rectHeight = lines.length * hightStep + 10;

        let widthStep = attrs['.flexberry-uml-header-text'].fontSize / 1.5;
        let rectWidth = maxStringChars * widthStep  + 10;

        newHeight += rectHeight;
        newWidth = newWidth > rectWidth ? newWidth : rectWidth;
        attrs['.flexberry-uml-' + rect.type + '-text'].text = lines.join('\n');
        attrs['.flexberry-uml-' + rect.type + '-rect'].height = rectHeight;
        attrs['.flexberry-uml-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';

        offsetY += rectHeight;
      }
    });

    newWidth = this.attributes.size.width > 1 ? this.attributes.size.width : newWidth;
    this.resize(newWidth, newHeight);
  }
});

joint.dia.Link.define('flexberryUml.BaseLink', {
  attrs: {
    text: { 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' }
  },
  labels: [{
    position: { distance: 10, offset: -15 }, attrs: { text: { text: '' } } }, {
    position: { distance: 10, offset: 15 }, attrs: { text: { text: '' } } }, {
    textAnchor: 'middle', attrs: { text: { text: '' } } }, {
    position: { distance: -40, offset: 15 }, attrs: { text: { text: '' } } }, {
    position: { distance: -40, offset: -15 }, attrs: { text: { text: '' } }
  }]
}, {
  setLabelText: function (label, text) {
    switch (label) {
      case 'startMultiplicity':
        this.label(0, { attrs: { text: { text: text } } });
        break;
      case 'startRole':
        this.label(1, { attrs: { text: { text: text } } });
        break;
      case 'description':
        this.label(2, { attrs: { text: { text: text } } });
        break;
      case 'endRole':
        this.label(3, { attrs: { text: { text: text } } });
        break;
      case 'endMultiplicity':
        this.label(4, { attrs: { text: { text: text } } });
        break;
      default:
        console.log('ERROR - choose correct label name');
        break;
    }

    return;
  },
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.BaseLinkWithUnderline', {
}, {
  initialize: function() {
    this.label(2, { attrs: { text: { 'text-decoration': 'underline', } } });
    joint.dia.Link.prototype.initialize.apply(this, arguments);
  },
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.Association', {
});

joint.shapes.flexberryUml.Association.define('flexberryUml.AssociationWithUnderline', {
}, {
  initialize: function() {
    joint.shapes.flexberryUml.BaseLinkWithUnderline.prototype.initialize.apply(this, arguments);
  },
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.Aggregation', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' } },
});

joint.shapes.flexberryUml.Aggregation.define('flexberryUml.AggregationWithUnderline', {
}, {
  initialize: function() {
    joint.shapes.flexberryUml.BaseLinkWithUnderline.prototype.initialize.apply(this, arguments);
  },
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.Qualified', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 z', fill: 'white' } },
}, {
  initialize: function() {
    joint.shapes.flexberryUml.BaseLinkWithUnderline.prototype.initialize.apply(this, arguments);
  },
});

joint.shapes.flexberryUml.Qualified.define('flexberryUml.QualifiedAggregation', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'white' } },
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

    this.label(2, { attrs: { text: { 'text-decoration': 'underline', } } });

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

joint.dia.Link.define('flexberryUml.NArrayAssociationConnect', {
  labels: [{
    position: { distance: 50 }, attrs: { text: { text: '' } }
  }]
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.Composition', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' } }
});

joint.shapes.flexberryUml.Composition.define('flexberryUml.CompositionWithUnderline', {
}, {
  initialize: function() {
    this.label(2, { attrs: { text: { 'text-decoration': 'underline', } } });
    joint.dia.Link.prototype.initialize.apply(this, arguments);
  },
});

joint.dia.Link.define('flexberryUml.NoteConnector', {
  attrs: {
    '.marker-target': { d: 'M 0 0 z' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '3 2' },
  },
});

joint.dia.Link.define('flexberryUml.Dependency', {
  attrs: {
    text: { 'font-size':'12', 'font-family':'Arial, helvetica, sans-serif' },
    '.marker-target': { d: 'M 0 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
  },
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

joint.dia.Element.define('flexberryUml.ComplexTransitionHorizon', {
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
      'ref-y': 0.99,
      'ref-x': 0,
      'text-anchor': 'middle',
      'y-alignment': 'start'
    }
  }
});
