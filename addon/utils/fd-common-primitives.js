import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberry.uml.BaseObject', {
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

joint.dia.Link.define('flexberry.uml.BaseLink', {
  attrs: {
    text: { 'font-size': '12', 'font-family': 'Arial, helvetica, sans-serif' }
  },
  labels: [{
    position: { distance: -40, offset: -15 }, attrs: { text: { text: '' } } }, {
    position: { distance: -40, offset: 15 }, attrs: { text: { text: '' } } }, {
    textAnchor: 'middle', attrs: { text: { text: '' } } }, {
    position: { distance: 10, offset: 15 }, attrs: { text: { text: '' } } }, {
    position: { distance: 10, offset: -15 }, attrs: { text: { text: '' } }
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

joint.shapes.flexberry.uml.BaseLink.define('flexberry.uml.BaseLinkWithUnderline', {
}, {
  initialize: function() {
    this.label(2, { attrs: { text: { 'text-decoration': 'underline', } } });
    joint.dia.Link.prototype.initialize.apply(this, arguments);
  },
});

joint.shapes.flexberry.uml.BaseLinkWithUnderline.define('flexberry.uml.Qualified', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 z', fill: 'white' } }
});

joint.shapes.flexberry.uml.Qualified.define('flexberry.uml.QualifiedAggregation', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'white' } },
});

joint.shapes.flexberry.uml.Qualified.define('flexberry.uml.QualifiedComposition', {
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

joint.dia.Link.define('flexberry.uml.NArrayAssociationConnect', {
  labels: [{
    position: { distance: 50 }, attrs: { text: { text: '' } }
  }]
});

joint.dia.Link.define('flexberry.uml.Dependency', {
  attrs: {
    text: { 'font-size':'12', 'font-family':'Arial, helvetica, sans-serif' },
    '.marker-target': { d: 'M 0 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
  },
});

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

joint.shapes.uml.EndState.define('flexberry.uml.EndState', {
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
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<polyline/>',
    '</g>',
    '<text/>',
    '</g>'
  ].join('')
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
