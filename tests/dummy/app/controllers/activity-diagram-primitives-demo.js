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
        attrs: { path: { title:'Коннектор комментария (Note Connector)' } }
      });

      var linkObjectFlow = new joint.shapes.flexberryUml.ObjectFlow({
        source: { x:100, y:150 },
        target: { x:300, y:150 },
        labels:[{
          attrs: { text: { text: 'Label' } }
        }],
        attrs: {
          path: { title:'Изменение объекта (Object Flow)' },
        }
      });

      var linkTransition = new joint.shapes.flexberryUml.Transition({
        source: { x:100, y:250 },
        target: { x:300, y:250 },
        labels:[{
          attrs: { text: { text: 'Label' } }
        }],
        attrs: { path: { title:'Переход (Transition)' } }
      });

      var сomplexTransitionHorizon = new joint.shapes.flexberryUml.ComplexTransitionHorizon({
        size: { width: 100 },
        position: { x: 100, y: 300 },
        attrs: {
          text: { text: 'Some text' },
          '.rotatable': { title:'Синхронизатор/разветвитель (Complex Transition)' } }
      });

      var сomplexTransitionVertical = new joint.shapes.flexberryUml.ComplexTransitionVertical({
        size: { height: 100 },
        position: { x: 100, y: 350 },
        attrs: {
          text: { text: 'Some text' },
          '.rotatable': { title:'Синхронизатор/разветвитель (Complex Transition)' } }
      });

      _this.graph.addCell([linkNoteConnector, linkObjectFlow, linkTransition, сomplexTransitionHorizon, сomplexTransitionVertical]);

      let note = new joint.shapes.flexberryUml.Note({
        position: { x: 450, y: 100 },
        size: { width: 100, height: 50 },
        name: 'note',
        attrs: { '.rotatable': { title:'Комментарий (Note)' } }
      });

      let SignalReceiptRight = new joint.shapes.flexberryUml.SignalReceiptRight({
        position: { x: 450, y: 200 },
        name: ['Receipt1', 'text'],
        attrs: {
          '.rotatable': { title:'Получение сигнала (Signal Receipt)' }
        }
      });

      let SignalReceiptLeft = new joint.shapes.flexberryUml.SignalReceiptLeft({
        position: { x: 450, y: 300 },
        name: 'Receipt2',
        attrs: {
          '.rotatable': { title:'Получение сигнала (Signal Receipt)' }
        }
      });

      let SignalSendingRight = new joint.shapes.flexberryUml.SignalSendingRight({
        position: { x: 450, y: 400 },
        name: ['Sending1', 'text', 'moreText'],
        attrs: {
          '.rotatable': { title:'Отправка сигнала (Signal Sending)' }
        }
      });

      let SignalSendingLeft = new joint.shapes.flexberryUml.SignalSendingLeft({
        position: { x: 450, y: 500 },
        name: 'Sending2',
        attrs: {
          '.rotatable': { title:'Отправка сигнала (Signal Sending)' }
        }
      });

      let startState = new joint.shapes.flexberryUml.StartState({
        position: { x: 100, y: 204 },
        attrs: {
          text: { text: 'Start State' }
        }
      });

      let endState = new joint.shapes.flexberryUml.EndState({
        position: { x: 150, y: 200 },
        attrs: {
          text: { text: 'End State' }
        }
      });

      let decision = new joint.shapes.flexberryUml.Decision({
        position: { x: 600, y: 100 },
        size: { width: 100, height: 50 },
        attrs: {
          text: { text: 'no display text' }
        }
      });

      let objectInState = new joint.shapes.flexberryUml.ObjectInState({
        position: { x: 600, y: 200 },
        size: { width: 100, height: 50 },
        name: 'name',
        state: 'state'
      });

      let activeState = new joint.shapes.flexberryUml.ActiveState({
        position: { x: 600, y: 300 },
        size: { width: 100, height: 50 },
        name: 'name',
        state: 'state'
      });

      let partition = new joint.shapes.flexberryUml.Partition({
        position: { x: 600, y: 350 },
        name: 'partition'
      });

      _this.graph.addCell([note, SignalReceiptRight, SignalReceiptLeft, SignalSendingRight,
        SignalSendingLeft, startState, endState, decision, objectInState, activeState, partition]);
    }
  }
});

