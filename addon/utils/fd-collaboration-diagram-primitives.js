import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberryUml.BaseCollRect', {
  attrs: {
    '.uml-base-rect': { 'stroke': 'black', 'strokeWidth': '1', 'fill': '#ffffff' },

    '.uml-base-text': {
      'text-decoration': 'underline',
      'ref': '.uml-base-rect',
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
    '<rect class="uml-base-rect"/>',
    '</g>',
    '<text class="uml-base-text"/>',
    '</g>'
  ].join(''),

  initialize: function () {
    this.on('change:name', function() {
      this.updateRectangles();
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getCollName: function() {
    return this.get('name');
  },

  updateRectangles: function() {
    let attrs = this.get('attrs');
    let rect =  { type: 'name', text: this.getCollName() };
    let lines = rect.text.split('\n');

    let maxStringChars = lines[0].length;
    for (let stringIndex = 0; stringIndex < lines.length; stringIndex++) {
      if (lines[stringIndex].length >= maxStringChars) {
        maxStringChars = lines[stringIndex].length;
      }
    }

    let hightStep = attrs['.uml-base-text'].fontSize;
    let rectHeight = lines.length * hightStep + 20;

    let widthStep = attrs['.uml-base-text'].fontSize / 1.5;
    let rectWidth = maxStringChars * widthStep  + 20;

    attrs['.uml-base-text'].text = rect.text;
    attrs['.uml-base-rect'].height = rectHeight;
    attrs['.uml-base-rect'].width = rectWidth;

    this.resize(rectWidth, rectHeight);
  }
});

joint.shapes.flexberryUml.BaseCollRect.define('flexberryUml.CollInstance', {
});

joint.shapes.flexberryUml.BaseCollRect.define('flexberryUml.CollMultiObj', {
  attrs: {
    '.uml-background-rect': {
      'ref': '.uml-base-rect',
      'refY': 5,
      'refX': 5,
      'stroke': 'black',
      'strokeWidth': '1',
      'fill': '#ffffff'
    },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="uml-background-rect"/>',
    '<rect class="uml-base-rect"/>',
    '</g>',
    '<text class="uml-base-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    let attrs = this.get('attrs');
    let rect =  { type: 'name', text: this.getCollName() };
    let lines = rect.text.split('\n');

    let maxStringChars = lines[0].length;
    for (let stringIndex = 0; stringIndex < lines.length; stringIndex++) {
      if (lines[stringIndex].length >= maxStringChars) {
        maxStringChars = lines[stringIndex].length;
      }
    }

    let hightStep = attrs['.uml-base-text'].fontSize;
    let rectHeight = lines.length * hightStep + 20;

    let widthStep = attrs['.uml-base-text'].fontSize / 1.5;
    let rectWidth = maxStringChars * widthStep  + 20;

    attrs['.uml-base-text'].text = rect.text;
    attrs['.uml-base-rect'].height = rectHeight;
    attrs['.uml-base-rect'].width = rectWidth;
    attrs['.uml-background-rect'].height = rectHeight;
    attrs['.uml-background-rect'].width = rectWidth;

    this.resize(rectWidth, rectHeight);
  }
});

joint.shapes.flexberryUml.BaseCollRect.define('flexberryUml.CollActiveObj', {
});

joint.shapes.flexberryUml.BaseCollRect.define('flexberryUml.CollNArrayAssociation', {
  attrs: {
    '.uml-base-text': {
      'fontSize':12
    },
    path: {
      'd': 'M 0 20 L 50 0 100 20 50 40 Z',
    }
  },
  heightPadding: 70,
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<path class="uml-base-rect"/>',
    '</g>',
    '<text class="uml-base-text"/>',
    '</g>'
  ].join(''),
    
  updateRectangles: function() {
    let attrs = this.get('attrs');
    let rect = { type: 'name', text: this.getCollName() };
    let lines = rect.text.split('\n');

    let maxStringChars = lines[0].length;
    for (let stringIndex = 0; stringIndex < lines.length; stringIndex++) {
      if (lines[stringIndex].length >= maxStringChars) {
        maxStringChars = lines[stringIndex].length;
      }
    }

    let hightStep = attrs['.uml-base-text'].fontSize * 3;
    let rectHeight = lines.length * hightStep + 20;

    let widthStep = attrs['.uml-base-text'].fontSize / 1.5;
    let rectWidth = maxStringChars * widthStep  + 20;

    attrs['.uml-base-text'].text = rect.text;
    attrs['.uml-base-rect'].height = rectHeight;
    attrs['.uml-base-rect'].width = rectWidth;
  
    this.resize(rectWidth, rectHeight);
  }
});

joint.shapes.flexberryUml.BaseCollRect.define('flexberryUml.CollDesignPattern', {
  attrs: {
    '.uml-base-rect': { 'rx': '120', 'ry': '120', 'stroke': 'black', 'strokeDasharray': '10,2', 'strokeWidth': '1', 'fill': '#ffffff' }
  }
});

joint.dia.Link.define('flexberryUml.CollTreeLabelsLink', {
  labels: [{
    position: { distance: 50, offset: -15 }, attrs: { text: { text: '' } } }, {
    textAnchor: 'middle', attrs: { text: { 'text-decoration': 'underline', text: '' } } }, {
    position: { distance: -50, offset: -15 }, attrs: { text: { text: '' } }
  }]
});

joint.dia.Link.define('flexberryUml.CollNAssociationConnect', {
  labels: [{
    position: { distance: 50 }, attrs: { text: { text: '' } }
  }]
});

joint.dia.Link.define('flexberryUml.CollPatternConnect', {
  attrs: {
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '3 2' },
  },
  labels: [{
    position: { distance: 50 }, attrs: { text: { text: '' } }
  }]
});

joint.shapes.flexberryUml.CollTreeLabelsLink.define('flexberryUml.CollAssociationConnect', {
  labels: [{
    attrs: { text: { text: '' } }
  }]
});

joint.shapes.flexberryUml.CollTreeLabelsLink.define('flexberryUml.CollQualifiedConnect', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 z', fill: 'white' } },
});

joint.shapes.flexberryUml.CollTreeLabelsLink.define('flexberryUml.CollaborationAggregation', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' } },  
});

joint.shapes.flexberryUml.CollTreeLabelsLink.define('flexberryUml.CollAggregationConnect', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' } },  
});

joint.shapes.flexberryUml.CollTreeLabelsLink.define('flexberryUml.CollQAggregationConnect', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'white' } },  
});

joint.shapes.flexberryUml.CollTreeLabelsLink.define('flexberryUml.CollCompositionConnect', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' } },    
});

joint.shapes.flexberryUml.CollTreeLabelsLink.define('flexberryUml.CollQCompositionConnect', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'black' } },  
});