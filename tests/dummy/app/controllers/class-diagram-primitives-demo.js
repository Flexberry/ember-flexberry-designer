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

      var linkAggregation = new joint.shapes.flexberryUml.Aggregation({
        source: { x:100, y:30 },
        target: { x:300, y:30 }
      });
      linkAggregation.setLabel('startMultiplicity', '*');
      linkAggregation.setLabel('endMultiplicity', '1');
      linkAggregation.setLabel('description', 'Agregation');

      var linkAssociation = new joint.shapes.flexberryUml.Association({
        source: { x:100, y:80 },
        target: { x:300, y:80 }
      });
      linkAssociation.setLabel('startMultiplicity', '*');
      linkAssociation.setLabel('endMultiplicity', '1');
      linkAssociation.setLabel('description', 'Association');

      var linkComposition = new joint.shapes.flexberryUml.Composition({
        source: { x:100, y:120 },
        target: { x: 300, y: 120 }
      });
      linkComposition.setLabel('startMultiplicity', '*');
      linkComposition.setLabel('endMultiplicity', '0..1');
      linkComposition.setLabel('description', 'Composition');

      var linkDependency = new joint.shapes.flexberryUml.Dependency({
        source: { x:100, y:170 },
        target: { x:300, y:170 },
      });

      var linkRealization = new joint.shapes.flexberryUml.Realization({
        source: { x:100, y:220 },
        target: { x:300, y:220 },
      });

      var linkGeneralization = new joint.shapes.flexberryUml.Generalization({
        source: { x:100, y:270 },
        target: { x:300, y:270 },
      });

      var linkQualified = new joint.shapes.flexberryUml.Qualified({
        source: { x:100, y:320 },
        target: { x: 300, y: 320 }
      });
      linkQualified.setLabel('startRole', '1');
      linkQualified.setLabel('endRole', '2');
      linkQualified.setLabel('description', 'Qualified');

      var linkQualifiedAggregation = new joint.shapes.flexberryUml.QualifiedAggregation({
        source: { x:100, y:370 },
        target: { x:300, y:370 }
      });
      linkQualifiedAggregation.setLabel('startRole', '1');
      linkQualifiedAggregation.setLabel('endRole', '2');
      linkQualifiedAggregation.setLabel('description', 'Q-Agregation');

      var linkQualifiedComposition = new joint.shapes.flexberryUml.QualifiedComposition({
        source: { x:100, y:420 },
        target: { x: 300, y: 420 }
      });
      linkQualifiedComposition.setLabel('startRole', '1');
      linkQualifiedComposition.setLabel('endRole', '2');
      linkQualifiedComposition.setLabel('description', 'Q-Composition');

      var linkNestedClassAssociation = new joint.shapes.flexberryUml.NestedClassAssociation({
        source: { x:100, y:470 },
        target: { x: 300, y: 470 },
      });

      var linkNoteConnector = new joint.shapes.flexberryUml.NoteConnector({
        source: { x:100, y:520 },
        target: { x:300, y:520 },
      });

      _this.graph.addCell([linkAggregation, linkAssociation, linkComposition, linkDependency,
        linkRealization, linkGeneralization, linkQualified, linkQualifiedAggregation,
        linkQualifiedComposition, linkNestedClassAssociation, linkNoteConnector]);

      let attributes = ['attr1', 'attr2'];
      let methods = ['method1'];

      let classWithoutStp = new joint.shapes.flexberryUml.Class({
        position: { x: 350, y: 30 },
        name: 'Class1',
        attributes: attributes,
        methods: methods,
      });

      let classCollapsed = new joint.shapes.flexberryUml.ClassCollapsed({
        position: { x: 450, y: 30 },
        size: { width: 100 },
        name: 'ClassCollapsed',
        attributes: attributes,
        methods: methods,
      });

      let classWithStp = new joint.shapes.flexberryUml.Class({
        position: { x: 350, y: 150 },
        name: 'Class2textextext',
        stereotype: 'enumeration',
        attributes: attributes,
        methods: methods,
      });

      let nAryAssociation = new joint.shapes.flexberryUml.NAryAssociation({
        position: { x: 550, y: 30 },
        size: { width: 150, height: 75 },
        name: 'n-ary Association'
      });

      let obj = new joint.shapes.flexberryUml.Object({
        position: { x: 350, y: 300 },
        name: 'Object',
        attributes: attributes,
        methods: methods,
      });

      var instance = new joint.shapes.flexberryUml.Instance({
        position: { x: 350, y: 400 },
        name: 'Instance'
      });

      var multiObject = new joint.shapes.flexberryUml.MultiObject({
        position: { x: 350, y: 500 },
        size: { width: 150, height: 40 },
        name: 'multiObject'
      });

      var activeObj = new joint.shapes.flexberryUml.ActiveObject({
        position: { x: 350, y: 600 },
        name: 'Active object'
      });

      let templateClass = new joint.shapes.flexberryUml.TemplateClass({
        position: { x: 550, y: 150 },
        name: 'Class2textextext',
        attributes: attributes,
        methods: methods,
        params: 'params'
      });

      let note = new joint.shapes.flexberryUml.Note({
        position: { x: 550, y: 300 },
        name: 'Comment'
      });

      let moreClasses = new joint.shapes.flexberryUml.MoreClasses({
        position: { x: 550, y: 400 },
      });

      let packagePr = new joint.shapes.flexberryUml.Package({
        position: { x: 550, y: 500 },
        name: 'Class2',
        attributes: attributes,
      });

      _this.graph.addCell([classWithoutStp, classCollapsed, classWithStp, nAryAssociation, obj, instance, multiObject, activeObj,
        templateClass, note, moreClasses, packagePr]);
    }
  }
});
