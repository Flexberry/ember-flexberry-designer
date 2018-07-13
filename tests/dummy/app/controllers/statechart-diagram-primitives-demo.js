import Ember from 'ember';
import joint from 'npm:jointjs';

export default Ember.Controller.extend({
  actions: {
    printDiagram: function() {
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
          attrs: { path: { title:'Коннектор комментария (Note Connector)' } }
        });

        var linkEventMessage = new joint.shapes.flexberryUml.statechartDiagram_EventMessage({
          source: { x:100, y:150 },
          target: { x:300, y:150 },
          labels:[{
            attrs: { text: { text: 'EventMessage' } }
          }],
          attrs: { path: { title:'Сообщение (Event Message)' } }
        });

        var linkTransition = new joint.shapes.flexberryUml.statechartDiagram_Transition({
          source: { x:100, y:250 },
          target: { x:300, y:250 },
          labels:[{
            attrs: { text: { text: 'Transition' } }
          }],
          attrs: { path: { title:'Переход (Transition)' } }
        });

        _this.graph.addCell([linkNoteConnector, linkEventMessage, linkTransition]);

        let state = new joint.shapes.flexberryUml.statechartDiagram_State({
          position: { x: 450, y: 100 },
          name: 'StateName',
          attrs: { '.rotatable': { title:'Состояние (State)' } }
        });

        let stateEx = new joint.shapes.flexberryUml.statechartDiagram_StateEx({
          position: { x: 450, y: 150 },
          name: ['StateName', 'dsfsdg', 'dsfsdg'],
          attributes: ['attr1'],
          attrs: { '.rotatable': { title:'Состояние (StateEx)' } }
        });

        let statechartClass = new joint.shapes.flexberryUml.statechartDiagram_Class({
          position: { x: 450, y: 250 },
          name: 'ClassName',
          attrs: { '.rotatable': { title:'Класс (Class)' } }
        });

        let note = new joint.shapes.flexberryUml.Note({
          position: { x: 450, y: 300 },
          name: 'Comment'
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

        var сomplexTransitionHorizon = new joint.shapes.flexberryUml.ComplexTransitionHorizon({
          size: { width: 200 },
          position: { x: 100, y: 300 },
          attrs: {
            text: { text: 'Some text' },
            '.rotatable': { title:'Синхронизатор/разветвитель (Complex Transition)' } }
        });

        var сomplexTransitionVertical = new joint.shapes.flexberryUml.ComplexTransitionVertical({
          size: { height: 200 },
          position: { x: 100, y: 350 },
          attrs: {
            text: { text: 'Some text' },
            '.rotatable': { title:'Синхронизатор/разветвитель (Complex Transition)' } }
        });

        var history = new joint.shapes.flexberryUml.statechartDiagram_History({
          position: { x: 250, y: 200 },
        });

        var deepHistory = new joint.shapes.flexberryUml.statechartDiagram_DeepHistory({
          position: { x: 280, y: 200 },
        });

        var compositeState = new joint.shapes.flexberryUml.statechartDiagram_CompositeState({
          position: { x: 450, y: 350 },
          name: ['StateName'],
          attributes: ['attr1'],
          attrs: { '.rotatable': { title:'Состояние (StateEx)' } }
        });
        _this.graph.addCell([state, stateEx, statechartClass, note, startState, endState, сomplexTransitionHorizon,
        сomplexTransitionVertical, history, deepHistory, compositeState]);
      });
    }
  }
});
