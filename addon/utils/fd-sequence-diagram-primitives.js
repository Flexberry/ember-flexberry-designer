import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberry.uml.sequenceActors', {
  attrs: {
    size: {  },
    rect: { },
    link: undefined,
    linklength: 20,
    endLine: undefined
  }
}, {
  // markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/></g>',

  markup: [{
    tagName: 'g',
    className: 'rotatable',
    children: [{
      tagName: 'g',
      className: 'scalable',
      children: [{
        tagName: 'rect'
      }]    
    }, {
      tagName: 'image'
    }]
  }],

  initialize: function () {
    let width = this.attributes.attrs.size.width;
    let height = this.attributes.attrs.size.height;
    this.resize(width, height);
    this.attributes.attrs.rect.width = width;
    this.attributes.attrs.rect.height = height;
    this.attributes.endLine = new joint.shapes.basic.Circle({
      size: {
        width: 10,
        height: 10
      }
    });
    this.attributes.link = new joint.dia.Link({
      source: {
        id: this.cid,
        anchor: {
          name: 'bottom'
        }
      },
      target: {
        id: this.attributes.endLine.cid
      }
    });
    this.attributes.link.markup = '<path class="connection" stroke="black" ' +
      'stroke-width="' +
      this.attributes.attrs.rect['stroke-width'] +
      '" d="M 0 0 0 0"/>';
    let shift = this.attributes.attrs.rect.width / 2 - 4;
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    this.addTo(this.attributes.graph);
    this.attributes.endLine.addTo(this.attributes.graph);
    this.embed(this.attributes.endLine);
    this.attributes.endLine.position(shift, 100, { parentRelative: true });
    this.embed(this.attributes.endLine);
    this.attributes.endLine.on('change:position', function(element, position) {
      let actor = element.getParentCell();
      let actorPosition = actor.position();
      element.position(actorPosition.x + shift, position.y);
    });
    this.attributes.link.addTo(this.attributes.graph);
    this.embed(this.attributes.link);
  }
});

joint.shapes.flexberry.uml.sequenceActors.define('flexberry.uml.sequencediagramActor', {
  attrs: {
    size: { 'width': 24, 'height': 47 },
    image: { 'xlink:href': '/assets/images/actor.svg' }
  }
});

joint.shapes.flexberry.uml.sequenceActors.define('flexberry.uml.sequencediagramObject', {
  attrs: {
    size: { 'width': 40, 'height': 40 },
    rect: { width: 40, height: 40, fill: '#FFFFFF', stroke: 'black' },
  }
});

joint.shapes.flexberry.uml.sequencediagramObject.define('flexberry.uml.sequencediagramActiveObject', {
  attrs: {
    rect: { 'stroke-width':2 } }
});

joint.shapes.basic.Path.define('flexberry.uml.sequencediagramTerminator', {
  attrs: {
    size: { 'width': 40, 'height': 40 },
    path: { 'stroke-width':2, d: 'M0,0 40,40 M0,40 40,0z' }
  }
}, {
  initialize: function () {
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    this.addTo(this.attributes.graph);
  }
});

joint.dia.Link.define('flexberry.uml.sequencediagramProcedureCall', {
  attrs: {
    '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'black' }
  },
  /*labels: [{ textAnchor: 'middle', attrs: { text: { text:  '' } } }]*/
}, {
  initialize: function () {
    this.addTo(this.attributes.graph);
  }
});

joint.dia.Link.define('flexberry.uml.sequencediagramFlatMessage', {
  attrs: {
    '.marker-target': { d: 'M 0 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    '.connection': { stroke: 'black', 'stroke-width': 1 }
  },
}, {
  initialize: function () {
    this.addTo(this.attributes.graph);
  }
});

