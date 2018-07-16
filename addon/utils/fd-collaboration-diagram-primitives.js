import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberryUml.BaseCollaborationRect', {
  attrs: {
    '.uml-base-rect': { 'stroke': 'black', 'strokeWidth': '1', 'fill': '#ffffff' },

    '.uml-base-text': {
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
    '<image/>',
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

  getCollaborationName: function() {
    return this.get('name');
  },

  updateRectangles: function() {
    let attrs = this.get('attrs');
    let rect =  { type: 'name', text: this.getCollaborationName() };
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

joint.shapes.flexberryUml.BaseCollaborationRect.define('flexberryUml.CollaborationInstance', {
});

joint.shapes.flexberryUml.BaseCollaborationRect.define('flexberryUml.CollaborationMultiObj', {
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
    '<image/>',
    '<text class="uml-base-text"/>',
    '</g>'
  ].join(''),

  updateRectangles: function() {
    let attrs = this.get('attrs');
    let rect =  { type: 'name', text: this.getCollaborationName() };
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