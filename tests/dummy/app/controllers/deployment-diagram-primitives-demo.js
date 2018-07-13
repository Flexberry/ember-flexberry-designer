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

        var linkDependency = new joint.shapes.flexberryUml.Dependency({
          source: { x:100, y:150 },
          target: { x:300, y:150 },
          labels:[{
            attrs: { text: { text: 'Dependency' } }
          }],
          attrs: { path: { title:'Переход (Dependency)' } }
        });

        var linkConnection = new joint.shapes.flexberryUml.deploymentDiagram_Connection({
          source: { x:100, y:200 },
          target: { x:300, y:200 },
          labels:[{
            attrs: { text: { text: 'Connection' } }
          }],
          attrs: { path: { title:'Связь (Connection)' } }
        });

        _this.graph.addCell([linkNoteConnector, linkDependency, linkConnection]);

        var component = new joint.shapes.flexberryUml.deploymentDiagram_Component({
          position: { x: 450, y: 100 },
          name: ['StateName'],
          attrs: { '.rotatable': { title:'Компонент (Component)' } }
        });

        var node = new joint.shapes.flexberryUml.deploymentDiagram_Node({
          position: { x: 450, y: 150 },
          name: ['NodeName', 'text', 'text'],
          attrs: { '.rotatable': { title:'Узел (Node)' } }
        });
        node.addTo(_this.graph);

        var obj = new joint.shapes.flexberryUml.deploymentDiagram_Object({
          position: { x: 450, y: 220 },
          name: ['ObjectName', 'text', 'text'],
          attrs: { '.rotatable': { title:'Объект (Object)' } },
        });
        obj.addTo(_this.graph);

        var interfaceObj = new joint.shapes.flexberryUml.deploymentDiagram_Interface({
          position: { x: 500, y: 260 },
          name: ['Interface'],
          attrs: { '.rotatable': { title:'Интерфейс (Interface)' } },
          sourceObj: obj,
          graph: _this.graph
        });

        var activeObj = new joint.shapes.flexberryUml.deploymentDiagram_ActiveObject({
          position: { x: 450, y: 320 },
          name: ['ActiveObjectName', 'text'],
          attrs: { '.rotatable': { title:'Объект (Object)' } },
        });

        _this.graph.addCell([activeObj, obj, node, component, interfaceObj]);
      });
    }
  }
});
