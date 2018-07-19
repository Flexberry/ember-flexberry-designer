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

        let instance = new joint.shapes.flexberryUml.CollInstance({
          position: { x: 50, y: 10 },
          name: 'Instance',
        });

        let multiObject = new joint.shapes.flexberryUml.CollMultiObj({
          position: { x: 50, y: 60 },
          name: 'Multi Object \n new string',
        });

        let activeObject = new joint.shapes.flexberryUml.CollActiveObj({
          position: { x: 50, y: 120 },
          name: 'Active object',
        });

        let nArrayAssociation = new joint.shapes.flexberryUml.CollNArrayAssociation({
          position: { x: 50, y: 170 },
          name: 'N-array association',
        });

        let designPattern = new joint.shapes.flexberryUml.CollDesignPattern({
          position: { x: 50, y: 240 },
          name: 'Design Pattern',
        });

        let nAssociationConnector = new joint.shapes.flexberryUml.CollNAssociationConnect({
          source: { x:400, y:10 },
          target: { x:700, y:10 },
          labels: [{ attrs: { text: { text:  'n-Association' } } }]
        });

        let associationConnector = new joint.shapes.flexberryUml.CollAssociationConnect({
          source: { x:400, y:50 },
          target: { x:700, y:50 },
          labels: [{
            attrs: { text: { text: '1' } } }, {
            attrs: { text: { text: 'Association' } } }, {
            attrs: { text: { text: '2' } }
          }]
        });

        let qualifiedConnector = new joint.shapes.flexberryUml.CollQualifiedConnect({
          source: { x:400, y:90 },
          target: { x:700, y:90 },
          labels: [{
            attrs: { text: { text: '1' } } }, {
            attrs: { text: { text: 'Qualified' } } }, {
            attrs: { text: { text: '2' } }
          }]
        });

        let agregationConnector = new joint.shapes.flexberryUml.CollAggregationConnect({
          source: { x:400, y:140 },
          target: { x:700, y:140 },
          labels: [{
            attrs: { text: { text: '1' } } }, {
            attrs: { text: { text: 'Agregation' } } }, {
            attrs: { text: { text: '2' } }
          }]
        });

        let qAgregationConnector = new joint.shapes.flexberryUml.CollQAggregationConnect({
          source: { x:400, y:180 },
          target: { x:700, y:180 },
          labels: [{
            attrs: { text: { text: '1' } } }, {
            attrs: { text: { text: 'Q-Agregation' } } }, {
            attrs: { text: { text: '2' } }
          }]
        });

        let compositionConnector = new joint.shapes.flexberryUml.CollCompositionConnect({
          source: { x:400, y:210 },
          target: { x:700, y:210 },
          labels: [{
            attrs: { text: { text: '1' } } }, {
            attrs: { text: { text: 'Composition' } } }, {
            attrs: { text: { text: '2' } }
          }]
        });

        let qCompositionConnector = new joint.shapes.flexberryUml.CollQCompositionConnect({
          source: { x:400, y:250 },
          target: { x:700, y:250 },
          labels: [{
            attrs: { text: { text: '1' } } }, {
            attrs: { text: { text: 'Q-Composition' } } }, {
            attrs: { text: { text: '2' } }
          }]
        });

        let designPatternConnector = new joint.shapes.flexberryUml.CollPatternConnect({
          source: { x:400, y:290 },
          target: { x:700, y:290 },
          labels: [{ attrs: { text: { text:  'Design Pattern' } } }]
        });

        let inheritanceConnector = new joint.shapes.flexberryUml.CollInheritance({
          source: { x:400, y:320 },
          target: { x:700, y:320 },
          labels: [{ attrs: { text: { text:  'Inheritance' } } }]
        });

        let asyncMsgForward = new joint.shapes.flexberryUml.CollAsyncMsgForward({
          position: { x: 800, y: 50 }
        });

        let asyncMsgBack = new joint.shapes.flexberryUml.CollAsyncMsgBack({
          position: { x: 800, y: 100 }
        });

        let flatMsgForward = new joint.shapes.flexberryUml.CollFlatMsgForward({
          position: { x: 800, y: 140 }
        });

        let flatMsgBack = new joint.shapes.flexberryUml.CollFlatMsgBack({
          position: { x: 800, y: 180 }
        });

        let nestedMsgForward = new joint.shapes.flexberryUml.CollNestedMsgForward({
          position: { x: 800, y: 220 }
        });

        let nestedMsgBack = new joint.shapes.flexberryUml.CollNestedMsgBack({
          position: { x: 800, y: 260 }
        });

        _this.graph.addCell([
          instance,
          multiObject,
          activeObject,
          nArrayAssociation,
          designPattern,
          nAssociationConnector,
          associationConnector,
          qualifiedConnector,
          agregationConnector,
          qAgregationConnector,
          compositionConnector,
          qCompositionConnector,
          designPatternConnector,
          inheritanceConnector,
          asyncMsgForward,
          asyncMsgBack,
          flatMsgForward, 
          flatMsgBack,
          nestedMsgForward,
          nestedMsgBack
        ]);
      });
    }
  }
});
