import Controller from '@ember/controller';
import $ from 'jquery';
import joint from 'npm:jointjs';

import { Note } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-note';
import { Class, ClassCollapsed } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-class';
import { PropertyObject } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-property-object';
import { MoreClasses } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-more-classes';
import { NoteConnector } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-note-connector';
import { Association } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-association';
import { Composition } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-composition';
import { Generalization } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-generalization';
import { NAryAssociation } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-naryassociation';
import { Instance } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-instance';
import { MultiObject } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-multi-object';
import { ActiveObject } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-active-object';
import { Package } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-package';
import { Aggregation } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-aggregation';
import { Dependency } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-dependency';
import { QualifiedAssociation } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-qualified-association';
import { QualifiedAggregation } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-qualified-aggregation';
import { QualifiedComposition } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-qualified-composition';
import { NestedClassAssociation } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-nested-association';
import { TemplateClass } from 'ember-flexberry-designer/objects/uml-primitives/fd-uml-template-class';

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

      var linkAggregation = new Aggregation({
        startPoint:{ x:100, y:30 },
        endPoint: { x:300, y:30 },
        source: { x:100, y:30 },
        target: { x:300, y:30 }
      });
      linkAggregation.setLabelText('startMultiplicity', '1');
      linkAggregation.setLabelText('endMultiplicity', '*');
      linkAggregation.setLabelText('description', 'Agregation');

      var linkAssociation = new Association({
        startPoint:{ x:100, y:80 },
        endPoint: { x:300, y:80 },
        source: { x:100, y:80 },
        target: { x:300, y:80 }
      });
      linkAssociation.setLabelText('startMultiplicity', '1');
      linkAssociation.setLabelText('endMultiplicity', '*');
      linkAssociation.setLabelText('description', 'Association');

      var linkComposition = new Composition({
        startPoint:{ x:100, y:120 },
        endPoint: { x:300, y:120 },
        source: { x:100, y:120 },
        target: { x: 300, y: 120 }
      });
      linkComposition.setLabelText('startMultiplicity', '0..1');
      linkComposition.setLabelText('endMultiplicity', '*');
      linkComposition.setLabelText('description', 'Composition');

      var linkDependency = new Dependency({
        startPoint:{ x:100, y:170 },
        endPoint: { x:300, y:170 },
        source: { x:100, y:170 },
        target: { x:300, y:170 },
      });

      var linkGeneralization = new Generalization({
        startPoint:{ x:100, y:270 },
        endPoint: { x:300, y:270 },
        source: { x:100, y:270 },
        target: { x:300, y:270 },
      });

      var linkQualified = new QualifiedAssociation({
        startPoint:{ x:100, y:320 },
        endPoint: { x:300, y:320 },
        source: { x:100, y:320 },
        target: { x: 300, y: 320 }
      });
      linkQualified.setLabelText('startRole', '1');
      linkQualified.setLabelText('endRole', '2');
      linkQualified.setLabelText('description', 'Qualified');

      var linkQualifiedAggregation = new QualifiedAggregation({
        startPoint:{ x:100, y:370 },
        endPoint: { x:300, y:370 },
        source: { x:100, y:370 },
        target: { x:300, y:370 }
      });
      linkQualifiedAggregation.setLabelText('startRole', '1');
      linkQualifiedAggregation.setLabelText('endRole', '2');
      linkQualifiedAggregation.setLabelText('description', 'Q-Agregation');

      var linkQualifiedComposition = new QualifiedComposition({
        startPoint:{ x:100, y:420 },
        endPoint: { x:300, y:420 },
        source: { x:100, y:420 },
        target: { x: 300, y: 420 }
      });
      linkQualifiedComposition.setLabelText('startRole', '1');
      linkQualifiedComposition.setLabelText('endRole', '2');
      linkQualifiedComposition.setLabelText('description', 'Q-Composition');

      var linkNestedClassAssociation = new NestedClassAssociation({
        startPoint:{ x:100, y:470 },
        endPoint: { x:300, y:470 },
        source: { x:100, y:470 },
        target: { x: 300, y: 470 },
      });

      var linkNoteConnector = new NoteConnector({
        startPoint:{ x:100, y:520 },
        endPoint: { x:300, y:520 },
        source: { x:100, y:520 },
        target: { x:300, y:520 },
      });

      _this.graph.addCell([linkAggregation, linkAssociation, linkComposition, linkDependency,
        linkGeneralization, linkQualified, linkQualifiedAggregation,
        linkQualifiedComposition, linkNestedClassAssociation, linkNoteConnector]);

      let attributes = ['attr1', 'attr2'];
      let methods = ['method1'];

      let classWithoutStp = new Class({
        position: { x: 350, y: 30 },
        name: 'Class1',
        attributes: attributes,
        methods: methods,
      });

      let classCollapsed = new ClassCollapsed({
        position: { x: 450, y: 30 },
        size: { width: 100 },
        name: 'ClassCollapsed',
        attributes: attributes,
        methods: methods,
      });

      let classWithStp = new Class({
        position: { x: 350, y: 150 },
        name: 'Class2textextext',
        stereotype: 'enumeration',
        attributes: attributes,
        methods: methods,
      });

      let nAryAssociation = new NAryAssociation({
        position: { x: 550, y: 30 },
        size: { width: 150, height: 75 },
        name: 'n-ary Association'
      });

      let obj = new PropertyObject({
        position: { x: 350, y: 300 },
        name: 'Object',
        attributes: attributes,
        methods: methods,
      });

      var instance = new Instance({
        position: { x: 350, y: 400 },
        name: 'Instance'
      });

      var multiObject = new MultiObject({
        position: { x: 350, y: 500 },
        size: { width: 150, height: 40 },
        name: 'multiObject'
      });

      var activeObj = new ActiveObject({
        position: { x: 350, y: 600 },
        name: 'Active object'
      });

      let templateClass = new TemplateClass({
        position: { x: 550, y: 150 },
        name: 'Class2textextext',
        attributes: attributes,
        methods: methods,
        params: 'params'
      });

      let note = new Note({
        position: { x: 550, y: 300 },
        name: 'Comment'
      });

      let moreClasses = new MoreClasses({
        position: { x: 550, y: 400 },
      });

      let packagePr = new Package({
        position: { x: 550, y: 500 },
        name: 'Class2',
        attributes: attributes,
      });

      _this.graph.addCell([classWithoutStp, classCollapsed, classWithStp, nAryAssociation, obj, instance, multiObject, activeObj,
        templateClass, note, moreClasses, packagePr]);
    }
  }
});
