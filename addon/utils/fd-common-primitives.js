import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberryUml.Note', {
  attrs: {
    rect: {
      'stroke': 'black',
      'stroke-width':'1',
      'fill':'#fff',
    },
    text: {
      'ref': '.parent-rect',
      'font-weight': 'bold',
      'fill': 'black',
      'font-size': 12,
      'font-family': 'Arial'
    },
    '.corner-rect':{
      'ref':'.parent-rect',
      'ref-y': 0.1,
      'ref-x': 0.9,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'stroke': 'white',
      'stroke-width':'2'
    },
    '.corner':{
      'ref':'.parent-rect',
      'ref-y': 0.1,
      'ref-x': 0.9,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'stroke': 'black',
      'stroke-width':'1',
      'd':'M0,0 L0,10 L10,10 L0,0'
    },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="parent-rect" width="10" height="10"/>',
    '</g>',
    '<text/>',
    '<rect class="corner-rect" width="10" height="10"/>',
    '<path class="corner"/>',
    '</g>'
  ].join(''),
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