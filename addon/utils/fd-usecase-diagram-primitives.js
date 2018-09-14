import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberry.uml.Usecase', {
  attrs: {
    rect: { 'width': 400 },
    '.uml-usecase-rect': { 'rx': '120', 'ry': '120', 'stroke': 'black', 'strokeWidth': '1', 'fill': '#ffffff' },

    '.uml-usecase-text': {
      'ref': '.uml-usecase-rect',
      'textAnchor': 'middle',
      'yAlignment': 'middle',
      'fontWeight': 'bold',
      'refY': 0.5,
      'refX': 0.5,
      'fill': 'black',
      'fontSize': 12,
      'fontFamily': 'Arial'
    }
  },
  name: ''
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="uml-usecase-rect"/>',
    '</g>',
    '<image/>',
    '<text class="uml-usecase-text"/>',
    '</g>'
  ].join(''),

  initialize: function () {
    this.on('change:name', function() {
      this.updateRectangles();
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getUsecaseName: function() {
    return this.get('name');
  },

  updateRectangles: function() {
    let attrs = this.get('attrs');
    let rect =  { type: 'name', text: this.getUsecaseName() };
    let lines = rect.text.split('\n');

    let maxStringChars = lines[0].length;
    for (let stringIndex = 0; stringIndex < lines.length; stringIndex++) {
      if (lines[stringIndex].length >= maxStringChars) {
        maxStringChars = lines[stringIndex].length;
      }
    }

    let hightStep = attrs['.uml-usecase-text'].fontSize;
    let rectHeight = lines.length * hightStep + 20;

    let widthStep = attrs['.uml-usecase-text'].fontSize / 1.5;
    let rectWidth = maxStringChars * widthStep  + 20;

    attrs['.uml-usecase-text'].text = rect.text;
    attrs['.uml-usecase-rect'].height = rectHeight;
    attrs['.uml-usecase-rect'].width = rectWidth;

    this.resize(rectWidth, rectHeight);
  }
});

joint.shapes.flexberry.uml.Usecase.define('flexberry.uml.UsecaseBoundary', {

  attrs: {
    '.uml-usecase-rect': { 'rx': '0', 'ry': '0', 'stroke': 'black', 'strokeWidth': '1', 'fill': '#ffffff' },

    '.uml-usecase-text': {
      'ref': '.uml-usecase-rect',
      'textAnchor': 'middle',
      'yAlignment': 'middle',
      'fontWeight': 'bold',
      'refY': 0.25,
      'refX': 0.5,
      'fill': 'black',
      'fontSize': 12,
      'fontFamily': 'Arial'
    }
  }

}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="uml-usecase-rect"/>',
    '</g>',
    '<text class="uml-usecase-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    let attrs = this.get('attrs');
    let rect =  { type: 'name', text: this.getUsecaseName() };
    let lines = rect.text.split('\n');

    let maxStringChars = lines[0].length;
    for (let stringIndex = 0; stringIndex < lines.length; stringIndex++) {
      if (lines[stringIndex].length >= maxStringChars) {
        maxStringChars = lines[stringIndex].length;
      }
    }

    let hightStep = attrs['.uml-usecase-text'].fontSize;
    let rectHeight = lines.length * hightStep + 40;

    let widthStep = attrs['.uml-usecase-text'].fontSize / 1.5;
    let rectWidth = maxStringChars * widthStep  + 20;

    attrs['.uml-usecase-text'].text = rect.text;
    attrs['.uml-usecase-rect'].height = rectHeight;
    attrs['.uml-usecase-rect'].width = rectWidth;

    this.resize(rectWidth, rectHeight);
  }
});

joint.shapes.flexberry.uml.Usecase.define('flexberry.uml.UsecaseActor', {
  attrs: {
    image: {
      'xlink:href': 'assets/images/actor.svg',
      width: 30,
      'ref': '.uml-usecase-text',
      'refY': -55,
      'refX': 3,
      height: 50
    },

    '.uml-usecase-text': {
      'ref': '',
      'textAnchor': 'middle',
      'yAlignment': 'middle',
      'fontWeight': 'bold',
      'fill': 'black',
      'fontSize': 12,
      'fontFamily': 'Arial'
    }
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '</g>',
    '<image/>',
    '<text class="uml-usecase-text"/>',
    '</g>'
  ].join('')
});

joint.dia.Link.define('flexberry.uml.UseCaseUndirAssociation', {
  labels: [{ textAnchor: 'middle', attrs: { text: { text:  '' } } }]
});

joint.dia.Link.define('flexberry.uml.UseCaseDirAssociation', {
  attrs: {
    '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'black' }
  },

  labels: [{ textAnchor: 'middle', attrs: { text: { text:  '' } } }]
});

joint.dia.Link.define('flexberry.uml.UseCaseGeneralization', {
  attrs: {
    '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' }
  },

  labels: [{ textAnchor: 'middle', attrs: { text: { text:  '' } } }]
});
