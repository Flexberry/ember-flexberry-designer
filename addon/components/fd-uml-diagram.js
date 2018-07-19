import Ember from 'ember';
import joint from 'npm:jointjs';

export default Ember.Component.extend({
  primitives: undefined,

  links: undefined,

  _setIncorrectPoint: function(sourcePoint, targetPoint, sourceAttributes) {
    if (sourcePoint.X === targetPoint.X) {
      if (sourcePoint.Y > targetPoint.Y) {
        sourcePoint.Y = sourceAttributes.position.y;
      } else {
        sourcePoint.Y = sourceAttributes.position.y + sourceAttributes.size.height;
      }

    } else if (sourcePoint.Y === targetPoint.Y) {
      if (sourcePoint.X > targetPoint.X) {
        sourcePoint.X = sourceAttributes.position.x;
      } else {
        sourcePoint.X = sourceAttributes.position.x + sourceAttributes.size.width;
      }
    } else {
      let dxB = sourcePoint.X - sourceAttributes.position.x;
      let dxE = sourceAttributes.position.x + sourceAttributes.size.width - sourcePoint.X;
      let dyB = sourcePoint.Y - sourceAttributes.position.y;
      let dyE = sourceAttributes.position.y + sourceAttributes.size.height - sourcePoint.Y;
      let dx = dxB > dxE ? dxE : dxB;
      let dy = dyB > dyE ? dyE : dyB;
      if (dx < dy) {
        sourcePoint.X = dxB < dxE ? sourceAttributes.position.x : sourceAttributes.position.x + sourceAttributes.size.width;
      } else {
        sourcePoint.Y = dyB < dyE ? sourceAttributes.position.y : sourceAttributes.position.y + sourceAttributes.size.height;
      }

    }

    return sourcePoint;
  },

  init() {
    this.graph = new joint.dia.Graph();

    if (!this.get('primitives')) {
      this.set('primitives', []);
    }

    this.set('links', {
      Association: [],
      Composition: [],
      Generalization: [],
      Implemetnation: [],
    });

    return this._super(...arguments);
  },

  didInsertElement() {
    this._super(...arguments);
    let paper = document.getElementById('paper');
    let minX = 16384;
    let minY = 16384;
    let maxX = 0;
    let maxY = 0;
    let cadClasses = {};
    for (let i = 0; i < this.primitives.length; i++) {
      let primitive = this.primitives[i];
      if (primitive.$type.indexOf('STORMCASE.STORMNET.Repository.CADClass') < 0) {
        for (let linkType in this.links) {
          if (primitive.$type.indexOf('STORMCASE.UML.cad.' + linkType) >= 0) {
            this.links[linkType].push(primitive);
            break;
          }
        }

        continue;
      }

      cadClasses[primitive.$id] = primitive;
      let left = primitive.Location.X;
      let right = left + primitive.Size.Width;
      let top = primitive.Location.Y;
      let bottom = top + primitive.Size.Height;
      minX = left < minX ? left : minX;
      maxX = right > maxX ? right : maxX;
      minY = top < minY ? top : minY;
      maxY = bottom > maxY ? bottom : maxY;
    }

    if (minX > maxX) {
      maxX = paper && ('offsetWidth' in paper) ? paper.offsetWidth : 1024;
      maxY = 840;
    } else {
      maxX = minX + maxX;
      maxY = minY + maxY;
    }

    this.paper = new joint.dia.Paper({
      el: paper,
      width: maxX,
      height: maxY,
      gridSize: 1,
      model: this.graph,
    });

    let jCadClasses = {};
    for (let cadId in cadClasses) {
      let cadClass = cadClasses[cadId];
      let attributes = cadClass.AttributesTxt.Text.trim().split('\n');
      let methods = cadClass.MethodsTxt.Text.trim().split('\n');
      let display = cadClass.Folded ? 'none' : undefined;
      let jCadClass = new joint.shapes.uml.Interface({
        position: { x: cadClass.Location.X, y: cadClass.Location.Y },
        size: { width: cadClass.Size.Width, height: cadClass.Size.Height },
        name: cadClass.CaseName,
        attributes: attributes,
        methods: methods,
        ports: {
          groups: {
            'in': {
              position: 'absolute'
            },
            'out': {
              position: 'absolute'
            },
          }
        },
        attrs: {
          '.uml-class-name-rect': {
            fill: '#fff',
            stroke: '#000',
            'stroke-width': 1.0
          },
          '.uml-class-attrs-rect, .uml-class-methods-rect': {
            fill: '#fff',
            stroke: '#000',
            display: display,
            'stroke-width': 1.0
          },
          '.uml-class-attrs-text': {
            ref: '.uml-class-attrs-rect',
            display: display,
            'font-size': '8pt',
            'ref-y': 0.5,
            'y-alignment': 'middle'
          },
          '.uml-class-methods-text': {
            ref: '.uml-class-methods-rect',
            display: display,
            'font-size': '8pt',
            'ref-y': 0.5,
            'y-alignment': 'middle'
          }

        }
      });
      this.graph.addCell(jCadClass);
      jCadClasses[cadId] = jCadClass;
    }

    for (let linkType in this.links) {
      let links =  this.links[linkType];
      for (let i = 0; i < links.length; i++) {
        let link = links[i];
        let startClassId = link.StartPrimitive.$ref;
        let targetElement = jCadClasses[startClassId];
        let endClassId = link.EndPrimitive.$ref;
        let sourceElement = jCadClasses[endClassId];
        let startMultTxt =  ('StartMultTxt' in link) ? link.StartMultTxt.Text : '';
        let endMultTxt = ('EndMultTxt' in link) ? link.EndMultTxt.Text : '';
        /*let Points = JSON.stringify(link.Points);*/
        let targetPoint = link.Points.shift();
        let sourcePoint = link.Points.pop();

        if (targetPoint.X !== targetElement.attributes.position.x &&
          targetPoint.X !== targetElement.attributes.position.x + targetElement.attributes.size.width &&
          targetPoint.Y !== targetElement.attributes.position.y &&
          targetPoint.Y !== targetElement.attributes.position.y + targetElement.attributes.size.height) {
          /*alert(sourceElement.attributes.name + '->' + targetElement.attributes.name  +
          ' TargetElement Position: ' + JSON.stringify(targetElement.attributes.position) + ' Size: ' + JSON.stringify(targetElement.attributes.size) +
          ' targetPoint:' + JSON.stringify(targetPoint) + ' POINTS' + Points
          );*/
          targetPoint = this._setIncorrectPoint(targetPoint, sourcePoint, targetElement.attributes);
        }

        if (sourcePoint.X !== sourceElement.attributes.position.x &&
          sourcePoint.X !== sourceElement.attributes.position.x + sourceElement.attributes.size.width &&
          sourcePoint.Y !== sourceElement.attributes.position.y &&
          sourcePoint.Y !== sourceElement.attributes.position.y + sourceElement.attributes.size.height) {
          /*alert(sourceElement.attributes.name + '->' + targetElement.attributes.name  +
            ' SourceElement Position: ' + JSON.stringify(sourceElement.attributes.position) + ' Size: ' + JSON.stringify(sourceElement.attributes.size) +
            ' sourcePoint:' + JSON.stringify(sourcePoint) + ' POINTS' + Points
          );*/
          sourcePoint = this._setIncorrectPoint(sourcePoint, targetPoint, sourceElement.attributes);
        }

        let vertices = [];
        for (let np = 0; np < link.Points.length; np++) {
          let point = link.Points[np];
          vertices.push({ x: point.X, y: point.Y });
        }

        let targetPortArgs = {
          x: targetPoint.X - targetElement.attributes.position.x,
          y: targetPoint.Y - targetElement.attributes.position.y,
        };
        targetElement.addPort({ group: 'out', args: targetPortArgs });
        let targetPorts = targetElement.getPorts();
        let targetPort =  targetPorts[targetPorts.length - 1];
        let sourcePortArgs = {
          x: sourcePoint.X - sourceElement.attributes.position.x,
          y: sourcePoint.Y - sourceElement.attributes.position.y,
        };
        sourceElement.addPort({ group: 'in', args: sourcePortArgs });
        let sourcePorts = sourceElement.getPorts();
        let sourcePort =  sourcePorts[sourcePorts.length - 1];
        let attrs = {
          source: { id: sourceElement.id, port: sourcePort.id },
          target: { id: targetElement.id, port: targetPort.id },
          labels: [
          { position: 10, attrs: { text: { text:  endMultTxt } } },
          { position: -10, attrs: { text: { text:  startMultTxt } } }
          ]
        };
        let jLink = new joint.shapes.uml[linkType](attrs);
        /*jLink.set('vertices', vertices);*/
        jLink.set('router', { name: 'manhattan' });

        this.graph.addCell(jLink);
      }
    }

  },

});
