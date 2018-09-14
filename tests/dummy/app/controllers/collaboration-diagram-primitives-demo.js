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

        let instance = new joint.shapes.flexberry.uml.Instance({
          position: { x: 50, y: 10 },
          name: 'Instance',
        });

        let multiObject = new joint.shapes.flexberry.uml.MultiObject({
          position: { x: 50, y: 60 },
          name: 'Multi Object',
        });

        let activeObject = new joint.shapes.flexberry.uml.ActiveObject({
          position: { x: 50, y: 120 },
          name: 'Active object',
        });

        let nArrayAssociation = new joint.shapes.flexberry.uml.NAryAssociation({
          position: { x: 50, y: 170 },
          name: 'N-array association',
        });

        let designPattern = new joint.shapes.flexberry.uml.CollDesignPattern({
          position: { x: 50, y: 240 },
          name: 'Design Pattern',
        });

        let nAssociationConnector = new joint.shapes.flexberry.uml.NArrayAssociationConnect({
          source: { x:400, y:10 },
          target: { x:700, y:10 },
          labels: [{ attrs: { text: { text:  'n-Association' } } }]
        });

        let associationConnector = new joint.shapes.flexberry.uml.CollaborationDiagramAssociation({
          source: { x:400, y:50 },
          target: { x:700, y:50 }
        });
        associationConnector.setLabelText('startRole', '1');
        associationConnector.setLabelText('endRole', '2');
        associationConnector.setLabelText('description', 'Association');

        let qualifiedConnector = new joint.shapes.flexberry.uml.Qualified({
          source: { x:400, y:90 },
          target: { x:700, y:90 }
        });
        qualifiedConnector.setLabelText('startRole', '1');
        qualifiedConnector.setLabelText('endRole', '2');
        qualifiedConnector.setLabelText('description', 'Qualified');

        let agregationConnector = new joint.shapes.flexberry.uml.CollaborationDiagramAggregation({
          source: { x:400, y:140 },
          target: { x:700, y:140 }
        });
        agregationConnector.setLabelText('startRole', '1');
        agregationConnector.setLabelText('endRole', '2');
        agregationConnector.setLabelText('description', 'Agregation');

        let qAgregationConnector = new joint.shapes.flexberry.uml.QualifiedAggregation({
          source: { x:400, y:180 },
          target: { x:700, y:180 }
        });
        qAgregationConnector.setLabelText('startRole', '1');
        qAgregationConnector.setLabelText('endRole', '2');
        qAgregationConnector.setLabelText('description', 'Q-Agregation');

        let compositionConnector = new joint.shapes.flexberry.uml.CollaborationDiagramComposition({
          source: { x:400, y:210 },
          target: { x:700, y:210 }
        });
        compositionConnector.setLabelText('startRole', '1');
        compositionConnector.setLabelText('endRole', '2');
        compositionConnector.setLabelText('description', 'Composition');

        let qCompositionConnector = new joint.shapes.flexberry.uml.QualifiedComposition({
          source: { x:400, y:250 },
          target: { x:700, y:250 }
        });
        qCompositionConnector.setLabelText('startRole', '1');
        qCompositionConnector.setLabelText('endRole', '2');
        qCompositionConnector.setLabelText('description', 'Q-Composition');

        let designPatternConnector = new joint.shapes.flexberry.uml.CollPatternConnect({
          source: { x:400, y:290 },
          target: { x:700, y:290 },
          labels: [{ attrs: { text: { text:  'Design Pattern' } } }]
        });

        let inheritanceConnector = new joint.shapes.flexberry.uml.CollInheritance({
          source: { x:400, y:320 },
          target: { x:700, y:320 },
          labels: [{ attrs: { text: { text:  'Inheritance' } } }]
        });

        let asyncMsgForward = new joint.shapes.flexberry.uml.CollAsyncMsgForward({
          position: { x: 800, y: 50 }
        });

        let asyncMsgBack = new joint.shapes.flexberry.uml.CollAsyncMsgBack({
          position: { x: 800, y: 100 }
        });

        let flatMsgForward = new joint.shapes.flexberry.uml.CollFlatMsgForward({
          position: { x: 800, y: 140 }
        });

        let flatMsgBack = new joint.shapes.flexberry.uml.CollFlatMsgBack({
          position: { x: 800, y: 180 }
        });

        let nestedMsgForward = new joint.shapes.flexberry.uml.CollNestedMsgForward({
          position: { x: 800, y: 220 }
        });

        let nestedMsgBack = new joint.shapes.flexberry.uml.CollNestedMsgBack({
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
