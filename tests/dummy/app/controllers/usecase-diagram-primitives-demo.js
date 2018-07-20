import Ember from 'ember';
import joint from 'npm:jointjs';

export default Ember.Controller.extend({
  actions: {
    printDiagram: function() {
      let _this = this;
      _this.graph = new joint.dia.Graph();

      let paper = document.getElementById('paper');
      let minX = 16384;
      let minY = 16384;
      let maxX = 0;
      let maxY = 0;
      let sidebar = Ember.$('.ui.sidebar.main.menu');
      let sidebarWidth = sidebar.hasClass('visible') ? sidebar.width() : 0;

      if (minX > maxX) {
        maxX = paper && ('offsetWidth' in paper) ? paper.offsetWidth : 1024;
        maxX += sidebarWidth;
        maxY = 840;
      } else {
        maxX = minX + maxX + sidebarWidth;
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
        name: 'UseCase \n primitive \n 1',
        ports: {
          groups: {
            'in': {
              position: 'absolute'
            },
            'out': {
              position: 'absolute'
            }
          }
        }
      });
      _this.graph.addCell(jUseCase);

      let jUseCaseBoundary = new joint.shapes.flexberryUml.UsecaseBoundary({
        position: { x: 50, y: 150 },
        size: { width: 70, height: 50 },
        name: 'Boundary \n Very long string uuuuuuuuuuuuuuuuuuuuu \n the end',
        ports: {
          groups: {
            'in': {
              position: 'absolute'
            },
            'out': {
              position: 'absolute'
            }
          }
        }
      });
      _this.graph.addCell(jUseCaseBoundary);

      let jUseCaseActor = new joint.shapes.flexberryUml.UsecaseActor({
        position: { x: 250, y: 50 },
        name: 'Actor',
        ports: {
          groups: {
            'in': {
              position: 'absolute'
            },
            'out': {
              position: 'absolute'
            }
          }
        }
      });
      _this.graph.addCell(jUseCaseActor);

      let jUseCaseUndirAssociation = new joint.shapes.flexberryUml.UseCaseUndirAssociation({
        source: { x:500, y:80 },
        target: { x:700, y:80 },
        labels: [{ attrs: { text: { text:  'Undir association' } } }]
      });
      _this.graph.addCell(jUseCaseUndirAssociation);

      let jUseCaseDirAssociation = new joint.shapes.flexberryUml.UseCaseDirAssociation({
        source: { x:500, y:150 },
        target: { x:700, y:150 },
        labels: [{ attrs: { text: { text:  'Directed association' } } }]
      });
      _this.graph.addCell(jUseCaseDirAssociation);

      let jUseCaseGeneralization = new joint.shapes.flexberryUml.UseCaseGeneralization({
        source: { x:500, y:200 },
        target: { x:700, y:200 },
        labels: [{ attrs: { text: { text:  'Generalization' } } }]
      });
      _this.graph.addCell(jUseCaseGeneralization);
    }
  }
});
