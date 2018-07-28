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

        let instance = new joint.shapes.flexberryUml.Instance({
          position: { x: 50, y: 10 },
          name: 'Instance',
        });

        let multiObject = new joint.shapes.flexberryUml.MultiObject({
          position: { x: 50, y: 60 },
          name: 'Multi Object',
        });

        let activeObject = new joint.shapes.flexberryUml.ActiveObject({
          position: { x: 50, y: 120 },
          name: 'Active object',
        });

        let nArrayAssociation = new joint.shapes.flexberryUml.NAryAssociation({
          position: { x: 50, y: 170 },
          name: 'N-array association',
        });

        let designPattern = new joint.shapes.flexberryUml.CollDesignPattern({
          position: { x: 50, y: 240 },
          name: 'Design Pattern',
        });

        let nAssociationConnector = new joint.shapes.flexberryUml.NArrayAssociationConnect({
          source: { x:400, y:10 },
          target: { x:700, y:10 },
          labels: [{ attrs: { text: { text:  'n-Association' } } }]
        });

        let associationConnector = new joint.shapes.flexberryUml.Association({
          source: { x:400, y:50 },
          target: { x:700, y:50 }
        });
        associationConnector.setLabel('startRole', { text: { text: '1' } });
        associationConnector.setLabel('endRole', { text: { text: '2' } });
        associationConnector.setLabel('description', { text: { text: 'Association', 'text-decoration': 'underline' } });

        let qualifiedConnector = new joint.shapes.flexberryUml.Qualified({
          source: { x:400, y:90 },
          target: { x:700, y:90 }
        });
        qualifiedConnector.setLabel('startRole', { text: { text: '1' } });
        qualifiedConnector.setLabel('endRole', { text: { text: '2' } });
        qualifiedConnector.setLabel('description', { text: { text: 'Qualified', 'text-decoration': 'underline' } });

        let agregationConnector = new joint.shapes.flexberryUml.Aggregation({
          source: { x:400, y:140 },
          target: { x:700, y:140 }
        });
        agregationConnector.setLabel('startRole', { text: { text: '1' } });
        agregationConnector.setLabel('endRole', { text: { text: '2' } });
        agregationConnector.setLabel('description', { text: { text: 'Agregation', 'text-decoration': 'underline' } });

        let qAgregationConnector = new joint.shapes.flexberryUml.QualifiedAggregation({
          source: { x:400, y:180 },
          target: { x:700, y:180 }
        });
        qAgregationConnector.setLabel('startRole', { text: { text: '1' } });
        qAgregationConnector.setLabel('endRole', { text: { text: '2' } });
        qAgregationConnector.setLabel('description', { text: { text: 'Q-Agregation', 'text-decoration': 'underline' } });

        let compositionConnector = new joint.shapes.flexberryUml.Composition({
          source: { x:400, y:210 },
          target: { x:700, y:210 }
        });
        compositionConnector.setLabel('startRole', { text: { text: '1' } });
        compositionConnector.setLabel('endRole', { text: { text: '2' } });
        compositionConnector.setLabel('description', { text: { text: 'Composition', 'text-decoration': 'underline' } });

        let qCompositionConnector = new joint.shapes.flexberryUml.QualifiedComposition({
          source: { x:400, y:250 },
          target: { x:700, y:250 }
        });
        qCompositionConnector.setLabel('startRole', { text: { text: '1' } });
        qCompositionConnector.setLabel('endRole', { text: { text: '2' } });
        qCompositionConnector.setLabel('description', { text: { text: 'Q-Composition', 'text-decoration': 'underline' } });

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
