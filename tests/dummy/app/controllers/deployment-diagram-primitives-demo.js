import Ember from 'ember';
import joint from 'npm:jointjs';
import { Dependency } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-dependency';
import { Connection } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-connection';
import { DeploymentActiveObject } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-deployment-active-object';
import { Instance } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-instance';
import { Component } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-component';
import { UmlNode } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-node';
import { NoteConnector } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-note-connector';

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

      var linkNoteConnector = new NoteConnector({
        startPoint:{ x:100, y:100 },
        endPoint: { x:300, y:100 },
        source: { x:100, y:100 },
        target: { x:300, y:100 },
        attrs: { path: { title:'Коннектор комментария (Note Connector)' } }
      });

      var linkDependency = new Dependency({
        startPoint:{ x:100, y:150 },
        endPoint: { x:300, y:150 },
        source: { x:100, y:150 },
        target: { x:300, y:150 },
        labels:[{
          attrs: { text: { text: 'Dependency' } }
        }],
        attrs: { path: { title:'Переход (Dependency)' } }
      });

      var linkConnection = new Connection({
        startPoint:{ x:100, y:200 },
        endPoint: { x:300, y:200 },
        source: { x:100, y:200 },
        target: { x:300, y:200 },
        labels:[{
          attrs: { text: { text: 'Connection' } }
        }],
        attrs: { path: { title:'Связь (Connection)' } }
      });

      _this.graph.addCell([linkNoteConnector, linkDependency, linkConnection]);

      var component = new Component({
        position: { x: 450, y: 100 },
        size: { width: 80, height: 40 },
        name: ['StateName'],
        attrs: { '.rotatable': { title:'Компонент (Component)' } }
      });

      var node = new UmlNode({
        position: { x: 450, y: 150 },
        size: { width: 80, height: 40 },
        name: ['NodeName', 'text', 'text'],
        attrs: { '.rotatable': { title:'Узел (Node)' } }
      });
      node.addTo(_this.graph);

      var obj = new Instance({
        position: { x: 450, y: 220 },
        size: { width: 100, height: 40 },
        name: ['ObjectName', 'text', 'text'],
        attrs: { '.rotatable': { title:'Объект (Object)' } },
      });
      obj.addTo(_this.graph);

      var interfaceObj = new joint.shapes.flexberry.uml.deploymentDiagram_Interface({
        position: { x: 500, y: 260 },
        name: ['Interface'],
        attrs: { '.rotatable': { title:'Интерфейс (Interface)' } },
        sourceObj: obj,
        graph: _this.graph
      });

      var activeObj = new DeploymentActiveObject({
        position: { x: 450, y: 320 },
        size: { width: 100, height: 40 },
        name: ['ActiveObjectName', 'text'],
        attrs: { '.rotatable': { title:'Объект (Object)' } },
      });

      _this.graph.addCell([activeObj, obj, node, component, interfaceObj]);
    }
  }
});
