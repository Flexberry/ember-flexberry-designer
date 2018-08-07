import joint from 'npm:jointjs';
import './fd-common-primitives';

import { Class } from '../objects/uml-primitives/fd-uml-class';

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

Class.define('flexberryUml.TemplateClass', {
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
    Class.prototype.updateRectangles.apply(this, arguments);

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

joint.dia.Link.define('flexberryUml.Realization', {
  attrs: {
    '.marker-target': { d: 'M 0 0 z' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
  },
});

joint.dia.Link.define('flexberryUml.Generalization', {
  attrs: { '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' } }
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.ClassDiagramAssociation', {
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.ClassDiagramAggregation', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' } },
});

joint.shapes.flexberryUml.BaseLink.define('flexberryUml.ClassDiagramComposition', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' } }
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
