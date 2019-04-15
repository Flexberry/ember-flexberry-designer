import Controller from '@ember/controller';
import $ from 'jquery';
import joint from 'npm:jointjs';

import { Note } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-note';
import { NoteConnector } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-note-connector';
import { StateEx, CompositeState } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-state-ex';
import { State } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-state';
import { StdClass } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-std-class';
import { ComplexTransitionH, ComplexTransitionV } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-complex-transition';
import { Connection } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-connection';
import { History, DeepHistory } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-history';
import { StartState } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-start-state';
import { FinalState } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-final-state';
import { Dependency } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-dependency';

export default Controller.extend({
  actions: {
    printDiagram: function() {
      let _this = this;
      _this.graph = new joint.dia.Graph();

      let paper = document.getElementById('paper');
      let minX = 16384;
      let minY = 16384;
      let maxX = 0;
      let maxY = 0;
      let sidebar = $('.ui.sidebar.main.menu');
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

      var linkNoteConnector = new NoteConnector({
        startPoint:{ x:100, y:100 },
        endPoint: { x:300, y:100 },
        source: { x:100, y:100 },
        target: { x:300, y:100 },
        attrs: { path: { title:'Коннектор комментария (Note Connector)' } }
      });

      var linkEventMessage = new Dependency({
        startPoint:{ x:100, y:150 },
        endPoint: { x:300, y:150 },
        source: { x:100, y:150 },
        target: { x:300, y:150 },
        labels:[{
          attrs: { text: { text: 'EventMessage' } }
        }],
        attrs: { path: { title:'Сообщение (Event Message)' } }
      });

      var linkTransition = new Connection({
        startPoint:{ x:100, y:250 },
        endPoint: { x:300, y:250 },
        source: { x:100, y:250 },
        target: { x:300, y:250 },
        labels:[{
          attrs: { text: { text: 'Transition' } }
        }],
        attrs: { path: { title:'Переход (Transition)' } }
      });

      _this.graph.addCell([linkNoteConnector, linkEventMessage, linkTransition]);

      let state = new State({
        position: { x: 450, y: 100 },
        size: { width: 100, height: 40 },
        name: 'StateName',
        attrs: { '.rotatable': { title:'Состояние (State)' } }
      });

      let stateEx = new StateEx({
        position: { x: 450, y: 150 },
        name: ['StateName', 'dsfsdg', 'dsfsdg'],
        attributes: ['attr1'],
        attrs: { '.rotatable': { title:'Состояние (StateEx)' } }
      });

      let statechartClass = new StdClass({
        position: { x: 450, y: 250 },
        size: { width: 100, height: 40 },
        name: 'ClassName',
        attrs: { '.rotatable': { title:'Класс (Class)' } }
      });

      let note = new Note({
        position: { x: 450, y: 300 },
        size: { width: 100, height: 40 },
        name: 'Comment'
      });

      let startState = new StartState({
        position: { x: 100, y: 204 },
        attrs: {
          text: { text: 'Start State' }
        }
      });

      let endState = new FinalState({
        position: { x: 150, y: 200 },
        attrs: {
          text: { text: 'End State' }
        }
      });

      var сomplexTransitionHorizon = new ComplexTransitionH({
        size: { width: 200 },
        position: { x: 100, y: 300 },
        attrs: {
          text: { text: 'Some text' },
          '.rotatable': { title:'Синхронизатор/разветвитель (Complex Transition)' } }
      });

      var сomplexTransitionVertical = new ComplexTransitionV({
        size: { height: 200 },
        position: { x: 100, y: 350 },
        attrs: {
          text: { text: 'Some text' },
          '.rotatable': { title:'Синхронизатор/разветвитель (Complex Transition)' } }
      });

      var history = new History({
        position: { x: 250, y: 200 },
      });

      var deepHistory = new DeepHistory({
        position: { x: 280, y: 200 },
      });

      var compositeState = new CompositeState({
        position: { x: 450, y: 350 },
        name: ['StateName'],
        attributes: ['attr1'],
        attrs: { '.rotatable': { title:'Состояние (StateEx)' } }
      });
      _this.graph.addCell([state, stateEx, statechartClass, note, startState, endState, сomplexTransitionHorizon,
      сomplexTransitionVertical, history, deepHistory, compositeState]);
    }
  }
});
