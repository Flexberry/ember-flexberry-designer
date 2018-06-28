import Ember from 'ember';
import joint from 'npm:jointjs';

export default Ember.Controller.extend({

  init() {
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

      var linkAggregation = new joint.shapes.flexberryUml.Aggregation({
        source: { x:100, y:30 },
        target: { x:300, y:30 },
      });

      var linkAssociation = new joint.shapes.flexberryUml.Association({
        source: { x:100, y:80 },
        target: { x:300, y:80 },
        labels: [{
          attrs: { text: { text:  '*' } } }, {
          attrs: { text: { text:  '0..1' } }
        }]
      });

      var linkComposition = new joint.shapes.flexberryUml.Composition({
        source: { x:100, y:120 },
        target: { x:300, y:120 },
      });

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
        target: { x:300, y:320 },
      });

      var linkQualifiedAggregation = new joint.shapes.flexberryUml.QualifiedAggregation({
        source: { x:100, y:370 },
        target: { x:300, y:370 },
      });

      var linkQualifiedComposition = new joint.shapes.flexberryUml.QualifiedComposition({
        source: { x:100, y:420 },
        target: { x:300, y:420 },
      });
      var linkNestedClassAssociation = new joint.shapes.flexberryUml.NestedClassAssociation({
        source: { x:100, y:470 },
        target: { x:300, y:470 },
      });

      _this.graph.addCell([linkAggregation, linkAssociation, linkComposition, linkDependency,
        linkRealization, linkGeneralization, linkQualified, linkQualifiedAggregation,
        linkQualifiedComposition, linkNestedClassAssociation]);

      let attributes = ['attr1', 'attr2'];
      let methods = ['method1'];

      let classWithoutStp = new joint.shapes.flexberryUml.Class({
        position: { x: 350, y: 30 },
        size: { width: 100, height: 100 },
        name: 'Class1',
        attributes: attributes,
        methods: methods,
      });

      let classWithStp = new joint.shapes.flexberryUml.Class({
        position: { x: 350, y: 150 },
        size: { width: 100, height: 100 },
        name: 'Class2',
        stereotype: 'enumeration',
        attributes: attributes,
        methods: methods,
      });

      let nAryAssociation = new joint.shapes.flexberryUml.NAryAssociation({
        position: { x: 550, y: 30 },
        size: { width: 150, height: 75 },
        attrs: {
          text: { text: 'n-ary Association' }
        }
      });

      let obj = new joint.shapes.flexberryUml.Object({
        position: { x: 350, y: 300 },
        size: { width: 100, height: 70 },
        name: 'Object',
        attributes: attributes,
        methods: methods,
      });

      var instance = new joint.shapes.flexberryUml.Instance({
        position: { x: 350, y: 400 },
        size: { width: 150, height: 40 },
        attrs: {
          text: { text: 'Instance' }
        }
      });

      var multiObject = new joint.shapes.flexberryUml.MultiObject({
        position: { x: 350, y: 500 },
        size: { width: 150, height: 40 },
        attrs: {
          text: { text: 'multiObject' }
        }
      });

      var activeObj = new joint.shapes.flexberryUml.ActiveObject({
        position: { x: 350, y: 600 },
        size: { width: 150, height: 40 },
        attrs: {
          text: { text: 'Active object' }
        }
      });

      _this.graph.addCell([classWithoutStp, classWithStp, nAryAssociation, obj, instance, multiObject, activeObj]);
    });
  },
});
