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
        position: { x: 50, y: 10 },
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
        position: { x: 50, y: 150 },
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

      let jUseCaseBoundary = new joint.shapes.flexberryUml.UsecaseBoundary({
        position: { x: 50, y: 200 },
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

      let jUseCaseUndirAssociation = new joint.shapes.flexberryUml.UseCaseUndirAssociation({
        source: { x:300, y:80 },
        target: { x:600, y:80 },
        labels: [{ attrs: { text: { text:  'Undir association' } } }]
      });
      _this.graph.addCell(jUseCaseUndirAssociation);

      let jUseCaseDirAssociation = new joint.shapes.flexberryUml.UseCaseDirAssociation({
        source: { x:300, y:150 },
        target: { x:600, y:150 },
        labels: [{ attrs: { text: { text:  'Directed association' } } }]
      });
      _this.graph.addCell(jUseCaseDirAssociation);

      let jUseCaseGeneralization = new joint.shapes.flexberryUml.UseCaseGeneralization({
        source: { x:300, y:200 },
        target: { x:600, y:200 },
        labels: [{ attrs: { text: { text:  'Generalization' } } }]
      });
      _this.graph.addCell(jUseCaseGeneralization);
    });
  },
});
