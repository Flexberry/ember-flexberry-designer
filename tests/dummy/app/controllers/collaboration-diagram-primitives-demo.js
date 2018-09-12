import Ember from 'ember';
import joint from 'npm:jointjs';

import { ActiveObject } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-active-object';
import { NAryAssociation } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-naryassociation';
import { Instance } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-instance';
import { MultiObject } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-multi-object';
import { Generalization } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-generalization';
import { QualifiedAggregation } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-qualified-aggregation';
import { QualifiedComposition } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-qualified-composition';
import { QualifiedAssociation } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-qualified-association';
import { Association } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-association';
import { AggregationLink } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-aggregation-link';
import { AssociationLink } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-association-link';
import { CompositionLink } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-composition-link';
import { DesignPattern } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-design-pattern';
import { DesignPatternConnector } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-design-pattern-connector';
import { CollFlatMsgForward } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-forward-flat-message';
import { CollNestedMsgForward } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-forward-nested-message';
import { CollAsyncMsgForward } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-forward-async-message';
import { CollNestedMsgBack } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-backward-nested-message';
import { CollFlatMsgBack } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-backward-flat-message';
import { CollAsyncMsgBack } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-backward-async-message';

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

        let instance = new Instance({
          position: { x: 50, y: 10 },
          size: { width: 100, height: 40 },
          name: 'Instance',
        });

        let multiObject = new MultiObject({
          position: { x: 50, y: 60 },
          size: { width: 100, height: 40 },
          name: 'Multi Object',
        });

        let activeObject = new ActiveObject({
          position: { x: 50, y: 120 },
          size: { width: 100, height: 40 },
          name: 'Active object',
        });

        let nArrayAssociation = new NAryAssociation({
          position: { x: 50, y: 180 },
          size: { width: 100, height: 40 },
          name: 'N-array association',
        });

        let designPattern = new DesignPattern({
          position: { x: 50, y: 240 },
          size: { width: 100, height: 40 },
          name: 'Design Pattern',
        });

        let nAssociationConnector = new Association({
          source: { x:400, y:10 },
          target: { x:700, y:10 },
          labels: [{ attrs: { text: { text:  'n-Association' } } }]
        });

        let associationConnector = new AssociationLink({
          source: { x:400, y:50 },
          target: { x:700, y:50 }
        });
        associationConnector.setLabelText('startRole', '1');
        associationConnector.setLabelText('endRole', '2');
        associationConnector.setLabelText('description', 'Association');

        let qualifiedConnector = new QualifiedAssociation({
          source: { x:400, y:90 },
          target: { x:700, y:90 }
        });
        qualifiedConnector.setLabelText('startRole', '1');
        qualifiedConnector.setLabelText('endRole', '2');
        qualifiedConnector.setLabelText('description', 'Qualified');

        let agregationConnector = new AggregationLink({
          source: { x:400, y:140 },
          target: { x:700, y:140 }
        });
        agregationConnector.setLabelText('startRole', '1');
        agregationConnector.setLabelText('endRole', '2');
        agregationConnector.setLabelText('description', 'Agregation');

        let qAgregationConnector = new QualifiedAggregation({
          source: { x:400, y:180 },
          target: { x:700, y:180 }
        });
        qAgregationConnector.setLabelText('startRole', '1');
        qAgregationConnector.setLabelText('endRole', '2');
        qAgregationConnector.setLabelText('description', 'Q-Agregation');

        let compositionConnector = new CompositionLink({
          source: { x:400, y:210 },
          target: { x:700, y:210 }
        });
        compositionConnector.setLabelText('startRole', '1');
        compositionConnector.setLabelText('endRole', '2');
        compositionConnector.setLabelText('description', 'Composition');

        let qCompositionConnector = new QualifiedComposition({
          source: { x:400, y:250 },
          target: { x:700, y:250 }
        });
        qCompositionConnector.setLabelText('startRole', '1');
        qCompositionConnector.setLabelText('endRole', '2');
        qCompositionConnector.setLabelText('description', 'Q-Composition');

        let designPatternConnector = new DesignPatternConnector({
          source: { x:400, y:290 },
          target: { x:700, y:290 },
          labels: [{ attrs: { text: { text:  'Design Pattern' } } }]
        });

        let inheritanceConnector = new Generalization({
          source: { x:400, y:320 },
          target: { x:700, y:320 },
          labels: [{ attrs: { text: { text:  'Inheritance' } } }]
        });

        let asyncMsgForward = new CollAsyncMsgForward({
          position: { x: 800, y: 50 }
        });

        let asyncMsgBack = new CollAsyncMsgBack({
          position: { x: 800, y: 100 }
        });

        let flatMsgForward = new CollFlatMsgForward({
          position: { x: 800, y: 140 }
        });

        let flatMsgBack = new CollFlatMsgBack({
          position: { x: 800, y: 180 }
        });

        let nestedMsgForward = new CollNestedMsgForward({
          position: { x: 800, y: 220 }
        });

        let nestedMsgBack = new CollNestedMsgBack({
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
