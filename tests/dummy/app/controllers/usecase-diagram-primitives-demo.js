import Ember from 'ember';
import joint from 'npm:jointjs'

export default Ember.Controller.extend({

  init() {
    let _this = this;
    Ember.run.schedule('afterRender',	function() {
      _this.graph = new joint.dia.Graph();

      let paper = document.getElementById('paper');
      let minX = 16384;
      let minY = 16384;
      let maxX = 0;
      let maxY = 0;

      if (minX > maxX) {
        maxX = paper && ('offsetWidth' in paper) ? paper.offsetWidth : 1024;
        maxY = 840;
      } else {
        maxX = minX + maxX;
        maxY = minY + maxY;
      }

      _this.paper = new joint.dia.Paper({
        el: paper,
        width: maxX,
        height: maxY,
        gridSize: 1,
        model: _this.graph,
      });

      let jUseCase = new joint.shapes.flexberryUml.Usecase({
        position: { x: 300, y: 100 },
        size: { width: 100, height: 40 },
        name: 'UseCase',
        ports: {
          groups: {
            'in': {
              position: 'absolute'
            },
            'out': {
              position: 'absolute'
            },
          }
      	},
      });
      _this.graph.addCell(jUseCase);

      let jUseCaseActor = new joint.shapes.flexberryUml.UsecaseActor({
        position: { x: 100, y: 200 },
        name: 'Actor',
        ports: {
          groups: {
            'in': {
              position: 'absolute'
            },
            'out': {
              position: 'absolute'
            },
          }
      	},
      });
      _this.graph.addCell(jUseCaseActor);

      let jUseCaseNote = new joint.shapes.flexberryUml.UsecaseNote({
        position: { x: 400, y: 100 },
        size: { width: 100, height: 70 },
        name: 'Note',
        ports: {
          groups: {
            'in': {
              position: 'absolute'
            },
            'out': {
              position: 'absolute'
            },
          }
      	},
      });
      _this.graph.addCell(jUseCaseNote);

      let jUseCaseBoundary = new joint.shapes.flexberryUml.UsecaseBoundary({
        position: { x: 600, y: 100 },
        size: { width: 70, height: 50 },
        name: 'Boundary',
        ports: {
          groups: {
            'in': {
              position: 'absolute'
            },
            'out': {
              position: 'absolute'
            },
          }
      	},
      });
      _this.graph.addCell(jUseCaseBoundary);

      let jUseCaseNoteConnector = new joint.shapes.flexberryUml.UsecaseNoteConnector({
        source: { x:100, y:80 },
        target: { x:300, y:80 },
        labels: [{ attrs: { text: { text:  'Note connector' } } }]
      });
      _this.graph.addCell(jUseCaseNoteConnector);

      let jUseCaseUndirAssociation = new joint.shapes.flexberryUml.UseCaseUndirAssociation({
        source: { x:500, y:80 },
        target: { x:800, y:80 },
        labels: [{ attrs: { text: { text:  'Undir association' } } }]
      });
      _this.graph.addCell(jUseCaseUndirAssociation);

      let jUseCaseDirAssociation = new joint.shapes.flexberryUml.UseCaseDirAssociation({
        source: { x:500, y:250 },
        target: { x:800, y:250 },
        labels: [{ attrs: { text: { text:  'Directed association' } } }]
      });
      _this.graph.addCell(jUseCaseDirAssociation);

      let jUseCaseGeneralization = new joint.shapes.flexberryUml.UseCaseGeneralization({
        source: { x:100, y:250 },
        target: { x:300, y:250 },
        labels: [{ attrs: { text: { text:  'Generalization' } } }]
      });
      _this.graph.addCell(jUseCaseGeneralization);
    });
  },
});