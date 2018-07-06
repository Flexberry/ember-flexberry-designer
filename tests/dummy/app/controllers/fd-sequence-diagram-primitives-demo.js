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

      /*let actor = */new joint.shapes.flexberryUml.sequencediagramActor({
        position: { x: 0, y: 0 },
        graph: _this.graph
      });

      /*let object = */new joint.shapes.flexberryUml.sequencediagramObject({
        position: { x: 100, y: 0 },
        graph: _this.graph
      });

      /*let activeObject = */new joint.shapes.flexberryUml.sequencediagramActiveObject({
        position: { x: 200, y: 0 },
        graph: _this.graph
      });

      /*let terminator = */new joint.shapes.flexberryUml.sequencediagramTerminator({
        position: { x: 300, y: 0 },
        graph: _this.graph
      });

      let sequencediagramProcedureCall = new joint.shapes.flexberryUml.sequencediagramProcedureCall({
        source: { x: 0, y: 200 },
        target: { x: 300, y: 200 },
        labels: [{ attrs: { text: { text:  'Procedure Call' } } }],
        graph: _this.graph
      });

      let sequencediagramFlatMessage = new joint.shapes.flexberryUml.sequencediagramFlatMessage({
        source: { x: 0, y: 250 },
        target: { x: 300, y: 250 },
        labels: [{ attrs: { text: { text:  'Flat Message' } } }],
        graph: _this.graph
      });

    });
  }
});
