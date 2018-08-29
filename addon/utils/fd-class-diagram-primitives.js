import joint from 'npm:jointjs';
import './fd-common-primitives';

import { BaseClass, Class } from '../objects/uml-primitives/fd-uml-class';

// Class.define('flexberry.uml.TemplateClass', {
//   attrs: {
//     '.flexberry-uml-params-rect': {
//       'stroke': 'black', 'stroke-width': 1,
//       'stroke-dasharray': '7 2',
//       'fill': 'white',
//     },

//     '.flexberry-uml-params-text': {
//       'ref': '.flexberry-uml-params-rect',
//       'ref-y': 0.5,
//       'ref-x': 0.5,
//       'text-anchor': 'middle',
//       'y-alignment': 'middle',
//       'font-weight': 'bold',
//       'fill': 'black',
//       'font-size': 12,
//       'font-family': 'Arial'
//     },
//   },

//   params:[],
// }, {
//   markup: [
//     '<g class="rotatable">',
//     '<g class="scalable">',
//     '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-params-rect"/>',
//     '<rect class="flexberry-uml-body-rect"/><rect class="flexberry-uml-footer-rect"/>',
//     '</g>',
//     '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-params-text"/>',
//     '<text class="flexberry-uml-body-text"/><text class="flexberry-uml-footer-text"/>',
//     '</g>'
//   ].join(''),

//   updateRectangles: function() {
//     Class.prototype.updateRectangles.apply(this, arguments);

//     var attrs = this.get('attrs');

//     let params = this.get('params');
//     let lines = Array.isArray(params) ? params : [params];

//     let maxStringChars = 0;
//     lines.forEach(function(line) {
//       if (line.length > maxStringChars) {
//         maxStringChars = line.length;
//       }
//     });

//     let rectHeight = lines.length * 12 + 10;
//     let rectWidth = maxStringChars * 8 + 10;

//     attrs['.flexberry-uml-params-text'].text = lines.join('\n');
//     attrs['.flexberry-uml-params-rect'].height = rectHeight;
//     attrs['.flexberry-uml-params-rect'].width = rectWidth;

//     let topTranslate = -rectHeight + 5;
//     attrs['.flexberry-uml-params-rect'].transform = 'translate(160, ' + topTranslate + ' )';

//     let newHeight = this.size().height + attrs['.flexberry-uml-params-rect'].height;
//     let newWidth = this.size().width + attrs['.flexberry-uml-params-rect'].width;

//     this.resize(newWidth, newHeight);
//   }
// });

// joint.dia.Link.define('flexberry.uml.Realization', {
//   attrs: {
//     '.marker-target': { d: 'M 0 0 z' },
//     '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
//   },
// });

// joint.shapes.flexberry.uml.BaseLink.define('flexberry.uml.ClassDiagramAggregation', {
//   attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' } },
// });

// joint.dia.Link.define('flexberry.uml.NestedClassAssociation', {
//   attrs: { '.marker-target': { d: 'M 10, 10 ' +
//                 'm -8, 0 ' +
//                 'a 8,8 0 1,0 16,0 ' +
//                 'a 8,8 0 1,0 -16,0 M 10 2 L 10 2 L 10 18', fill: 'transparent' } }
// });

// BaseClass.define('flexberry.uml.Package', {
//   attrs: {
//     '.flexberry-uml-header-text': {
//       'text-decoration': 'underline',
//       'font-weight': 'normal'
//     },
//     '.flexberry-uml-body-text': {
//       'ref-y': 0.5,
//       'ref-x': 0.5,
//       'text-anchor': 'middle',
//       'y-alignment': 'middle'
//     },
//   },
// }, {
//   markup: [
//     '<g class="rotatable">',
//     '<g class="scalable">',
//     '<g transform="scale(0.8,1)"><rect class="flexberry-uml-header-rect" /></g><rect class="flexberry-uml-body-rect"/>',
//     '</g>',
//     '<text class="flexberry-uml-header-text"/><text class="flexberry-uml-body-text"/>',
//     '</g>'
//   ].join(''),
// });
