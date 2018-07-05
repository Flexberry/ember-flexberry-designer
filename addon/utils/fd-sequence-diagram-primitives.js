/*export default function fdSequenceDiagramPrimitives() {
  return true;
}
*/
import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberryUml.sequenceActors', {
  attrs: {
    size: {  },
    rect: { },
    link: undefined,
    linklength: 20,
    endLine: undefined
  }
}, {
    markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/></g>',
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
            name: "bottom"
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
          //alert('element1 moved to ' + position.x + ',' + position.y);
        });
        this.attributes.link.addTo(this.attributes.graph);
        this.embed(this.attributes.link);
      }
});

joint.shapes.flexberryUml.sequenceActors.define('flexberryUml.sequencediagramActor', {
  attrs: {
    size: { 'width': 24, 'height': 47 },
    image: {'xlink:href': '/assets/images/actor.svg'}
    }
}, {
});

joint.shapes.flexberryUml.sequenceActors.define('flexberryUml.sequencediagramObject', {
  attrs: {
    size: { 'width': 40, 'height': 40 },
    rect: { width: 40, height: 40 ,fill: '#FFFFFF', stroke: 'black',},
    }
}, {
});


joint.shapes.flexberryUml.sequencediagramObject.define('flexberryUml.sequencediagramActiveObject', {
  attrs: {
    rect: {'stroke-width' : 2},  }
}, {

});
