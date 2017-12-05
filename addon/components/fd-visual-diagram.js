import Ember from 'ember';
import joint from '../external/jointjs';

import layout from '../templates/components/fd-visual-diagram';

export default Ember.Component.extend({
  layout,

  primitives: [],

  init() {
    this.graph = new joint.dia.Graph();
    return this._super();
  },

  didInsertElement() {
    this._super(...arguments);
    let paper = document.getElementById('paper');
    let minX = 16384;
    let minY = 16384;
    let maxX = 0;
    let maxY = 0;
    let cadClasses = {};
    let assosiations = [];
    let compositions = [];
    let generalizations = [];
    let implemetnations = [];
    for (let i = 0; i < this.primitives.length; i++) {
      let primitive = this.primitives[i];
      if (primitive.$type.indexOf('STORMCASE.STORMNET.Repository.CADClass') < 0) {
        if (primitive.$type.indexOf('STORMCASE.UML.cad.Association') >= 0) {
          assosiations.push(primitive);
        }

        if (primitive.$type.indexOf('STORMCASE.UML.cad.Composition') >= 0) {
          compositions.push(primitive);
        }

        if (primitive.$type.indexOf('STORMCASE.UML.cad.Generalization') >= 0) {
          generalizations.push(primitive);
        }

        if (primitive.$type.indexOf('STORMCASE.UML.cad.Implemetnation') >= 0) {
          implemetnations.push(primitive);
        }

        continue;
      }

      cadClasses[primitive.$id] = primitive;
      let left = primitive.Location.X;
      let right = left + primitive.Size.Width;
      let top = primitive.Location.Y;
      let bottom = top + primitive.Size.Height;
      minX = left < minX ? left : minX;
      maxX = right > maxX ? right : maxX;
      minY = top < minY ? top : minY;
      maxY = bottom > maxY ? bottom : maxY;
    }

    if (minX > maxX) {
      maxX = paper && ('offsetWidth' in paper) ? paper.offsetWidth : 1024;
      maxY = 840;
    } else {
      maxX = minX + maxX;
      maxY = minY + maxY;
    }

    this.paper = new joint.dia.Paper({
      el: paper,
      width: maxX,
      height: maxY,
      gridSize: 1,
      model: this.graph,
    });

    let jCadClasses = {};
    for (let cadId in cadClasses) {
      let cadClass = cadClasses[cadId];
      let attributes = cadClass.AttributesTxt.Text.trim().split('\n');
      let methods = cadClass.MethodsTxt.Text.trim().split('\n');
      let jCadClass = new joint.shapes.uml.Interface({
        position: { x: cadClass.Location.X, y: cadClass.Location.Y },
        size: { width: cadClass.Size.Width, height: cadClass.Size.Height },
        name: cadClass.CaseName,
        attributes: attributes,
        methods: methods,
        attrs: {
          '.uml-class-name-rect': {
            fill: '#fff',
            stroke: '#000',
            'stroke-width': 1.0
          },
          '.uml-class-attrs-rect, .uml-class-methods-rect': {
            fill: '#fff',
            stroke: '#000',
            'stroke-width': 1.0
          },
          '.uml-class-attrs-text': {
            ref: '.uml-class-attrs-rect',
            'font-size': '8pt',
            'ref-y': 0.5,
            'y-alignment': 'middle'
          },
          '.uml-class-methods-text': {
            ref: '.uml-class-methods-rect',
            'font-size': '8pt',
            'ref-y': 0.5,
            'y-alignment': 'middle'
          }

        }
      });
      this.graph.addCell(jCadClass);
      jCadClasses[cadId] = jCadClass;
    }

    for (let i = 0; i < assosiations.length; i++) {
      let assosiation = assosiations[i];
      let startClassId = assosiation.StartPrimitive.$ref;
      let endClassId = assosiation.EndPrimitive.$ref;
      let jAssociation = new joint.shapes.uml.Association({ source: { id: jCadClasses[endClassId].id }, target: { id: jCadClasses[startClassId].id } });
      this.graph.addCell(jAssociation);
    }

    for (let i = 0; i < compositions.length; i++) {
      let composition = compositions[i];
      let startClassId = composition.StartPrimitive.$ref;
      let endClassId = composition.EndPrimitive.$ref;
      let jComposition = new joint.shapes.uml.Composition({ source: { id: jCadClasses[endClassId].id }, target: { id: jCadClasses[startClassId].id } });
      this.graph.addCell(jComposition);
    }

    for (let i = 0; i < generalizations.length; i++) {
      let generalization = generalizations[i];
      let startClassId = generalization.StartPrimitive.$ref;
      let endClassId = generalization.EndPrimitive.$ref;
      let jGeneralization = new joint.shapes.uml.Generalization({ source: { id: jCadClasses[endClassId].id }, target: { id: jCadClasses[startClassId].id } });
      this.graph.addCell(jGeneralization);
    }

    for (let i = 0; i < implemetnations.length; i++) {
      let implemetnation = implemetnations[i];
      let startClassId = implemetnation.StartPrimitive.$ref;
      let endClassId = implemetnation.EndPrimitive.$ref;
      let jImplemetnation = new joint.shapes.uml.Implemetnation({ source: { id: jCadClasses[endClassId].id }, target: { id: jCadClasses[startClassId].id } });
      this.graph.addCell(jImplemetnation);
    }

  },

});
