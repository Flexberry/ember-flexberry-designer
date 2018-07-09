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
    let rectHeight = lines.length * hightStep + 10;

    let widthStep = attrs['.flexberry-uml-header-text'].fontSize / 1.5;
    let rectWidth = maxStringChars * widthStep  + 10;

    attrs['.flexberry-uml-header-text'].text = lines.join('\n');
    attrs['.flexberry-uml-header-rect'].height = rectHeight;
    attrs['.flexberry-uml-header-rect'].width = rectWidth;

    this.resize(rectWidth, rectHeight);
  }
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

joint.dia.Link.define('flexberryUml.NoteConnector', {
  attrs: {
    '.marker-target': { d: 'M 0 0 z' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '3 2' },
  },
});

joint.dia.Link.define('flexberryUml.Dependency', {
  attrs: {
    '.marker-target': { d: 'M 0 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
  },
});
