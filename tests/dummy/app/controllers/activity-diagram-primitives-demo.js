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

      var linkNoteConnector = new joint.shapes.flexberryUml.NoteConnector({
        source: { x:100, y:100 },
        target: { x:300, y:100 },
      });

      var linkObjectFlow = new joint.shapes.flexberryUml.ObjectFlow({
        source: { x:100, y:150 },
        target: { x:300, y:150 },
      });

      _this.graph.addCell([linkNoteConnector, linkObjectFlow]);

      let note = new joint.shapes.flexberryUml.Note({
        position: { x: 450, y: 100 },
        size: { width: 100, height: 50 },
        name: 'Class2',
        attrs: {
          text: { text: 'Note' }
        }
      });

      let SignalReceiptRight = new joint.shapes.flexberryUml.SignalReceiptRight({
        position: { x: 450, y: 200 },
        size: { width: 100, height: 50 },
        attrs: {
          text: { text: 'Receipt1' }
        }
      });

      let SignalReceiptLeft = new joint.shapes.flexberryUml.SignalReceiptLeft({
        position: { x: 450, y: 300 },
        size: { width: 100, height: 50 },
        attrs: {
          text: { text: 'Receipt2' }
        }
      });

      let SignalSendingRight = new joint.shapes.flexberryUml.SignalSendingRight({
        position: { x: 450, y: 400 },
        size: { width: 100, height: 50 },
        attrs: {
          text: { text: 'Receipt2' }
        }
      });

      let SignalSendingLeft = new joint.shapes.flexberryUml.SignalSendingLeft({
        position: { x: 450, y: 500 },
        size: { width: 100, height: 50 },
        attrs: {
          text: { text: 'Receipt2' }
        }
      });

      let startState = new joint.shapes.flexberryUml.StartState({
        position: { x: 100, y: 204 },
      });

      let endState = new joint.shapes.flexberryUml.EndState({
        position: { x: 150, y: 200 },
      });

      _this.graph.addCell([note, SignalReceiptRight, SignalReceiptLeft, SignalSendingRight, SignalSendingLeft, startState, endState]);
    });
  }
});

