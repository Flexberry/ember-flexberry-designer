import Ember from 'ember';
import joint from 'npm:jointjs';

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

      let attributes = ['attr1','attr2'];
      let methods = ['method1'];
      let jCadClass = new joint.shapes.flexberryUml.Class({
        position: { x: 100, y: 100 },
        size: { width: 100, height: 100 },
        name: 'CaseName',
        attributes: attributes,
        methods: methods,
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

      _this.graph.addCell(jCadClass);
    });
  },
});
