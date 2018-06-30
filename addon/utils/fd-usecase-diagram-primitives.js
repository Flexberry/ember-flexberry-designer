import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberryUml.Usecase', {
  attrs: {
    rect: { 'width': 400 },
    '.uml-usecase-rect': { 'rx': '120', 'ry': '120', 'stroke': 'black', 'strokeWidth': '1', 'fill': '#ffffff' },

    '.uml-usecase-text': {
      'ref': '.uml-usecase-rect',
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'font-weight': 'bold',
      'ref-y': .5,
      'ref-x': .5,
      'fill': 'black',
      'font-size': 12,
      'font-family': 'Arial'
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
      this.trigger('uml-update');
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getUsecaseName: function() {
    return this.get('name');
  },

  updateRectangles: function() {
    var attrs = this.get('attrs');
    var rect =  { type: 'name', text: this.getUsecaseName() };
    var offsetY = 0;
    var lines = Array.isArray(rect.text) ? rect.text : [rect.text];

    var rectHeight = lines.length * 20 + 20;

    attrs['.uml-usecase-text'].text = lines.join('\n');
    attrs['.uml-usecase-rect'].height = rectHeight;
    attrs['.uml-usecase-rect'].transform = 'translate(0,' + offsetY + ')';

    offsetY += rectHeight;
  }
});

joint.shapes.flexberryUml.Usecase.define('flexberryUml.UsecaseActor', {
 
  attrs: {
    image: {
      'xlink:href': 'assets/images/actor.svg',
      'ref-x': -15,
      'ref-y': -60,
      ref: '.uml-usecase-rect',
      width: 30,
      height: 50
    }
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="uml-usecase-rect"/>',
    '</g>',
    '<image/>',
    '<text class="uml-usecase-text"/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberryUml.Usecase.define('flexberryUml.UsecaseNote', {
 
  attrs: {
    '.uml-usecase-rect': { 'rx': '0', 'ry': '0', 'stroke': '', 'strokeWidth': '', 'fill': '' },
    image: {
      'xlink:href': 'assets/images/note.svg',
      'ref-x': .5,
      'ref-y': .5,
      'y-alignment': 'middle',
      'x-alignment': 'middle',
      ref: '.uml-usecase-rect',
      width: 80,
      height: 50
    }
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="uml-usecase-rect"/>',
    '</g>',
    '<image/>',
    '<text class="uml-usecase-text"/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberryUml.Usecase.define('flexberryUml.UsecaseBoundary', {
 
  attrs: {
    '.uml-usecase-rect': { 'rx': '0', 'ry': '0', 'stroke': 'black', 'strokeWidth': '1', 'fill': '#ffffff' },
    
    '.uml-usecase-text': {
      'ref': '.uml-usecase-rect',
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'font-weight': 'bold',
      'ref-y': .1,
      'ref-x': .5,
      'fill': 'black',
      'font-size': 12,
      'font-family': 'Arial'
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
  ].join('')
});

joint.dia.Link.define('flexberryUml.UsecaseNoteConnector', {
  attrs: {
    '.connection': { 'stroke-dasharray': '3,3' }
  },
  labels: [{textAnchor: 'middle', attrs: { text: { text:  '' } } }]
});

joint.dia.Link.define('flexberryUml.UseCaseUndirAssociation', {
  labels: [{textAnchor: 'middle', attrs: { text: { text:  '' } } }]
});

joint.dia.Link.define('flexberryUml.UseCaseDirAssociation', {
  attrs: { 
    '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'black' } 
  },

  labels: [{textAnchor: 'middle', attrs: { text: { text:  '' } } }]
});

joint.dia.Link.define('flexberryUml.UseCaseGeneralization', {
  attrs: { 
    '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' } 
  },
  
  labels: [{textAnchor: 'middle', attrs: { text: { text:  '' } } }]
});

