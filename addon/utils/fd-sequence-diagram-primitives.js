/*export default function fdSequenceDiagramPrimitives() {
  return true;
}
*/
import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberryUml.Actor', {
  attrs: {
    size: { 'width': 24, 'height': 47 },
    image: {
      'xlink:href': ['data:image/png;base64,',
        'iVBORw0KGgoAAAANSUhEUgAAABgAAAAvCAYAAAD5CArtAAAABHNCSVQICAgIfAhkiAAAAAlw',
        'SFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAA',
        'AJlSURBVFiF7dhNiI1RHAbw33UN4ytKyFIim8nOgtkoVmxsLKR8SyjJlAhjMSuFBckGRYnxlX',
        'xFGR8hYaWQUjSiTJFokI+5Fue8uca9d9733msxNU+d3rfzPv/n+b/3Ped/zrlURiOW4Qxe4Qs',
        '+4ikOYm4f8RWxCG9QQCeOYw/24QI+x2f30ZRVfG8MvofZZThDsQpv0Y0FacVbo/geDE7Bn4C7+',
        'IbmvshN+InDabOJGIPnsQ2pRGxHF0ZnNIA5wpsvLUcYLvyWu6sQT/AMl4s7BhXdT4kmN2swuI',
        'Hp5QzGx2tXDQbvok6ulMH7eB1bg8HYqFMoZfAC3zGzBoNmPKlEuCTM2mFViM8QMl9XiTQLPdi',
        'VUbwRj/AaI/si74+ZbEopPgLnhQk6P01AHqeiyTlMq8CdJ4z9n1hTipAr1Rn7W7BD+B4PcVso',
        'bEMxSSjVk/ESK9GRJvveGIfteCCMsEJsn3BRKAsN1QiXwx3cyhKQphwX43tG/l8T7b+g/xsUf',
        '4NG5YdtgiShNKXka++OD/4Mw3q0ib3foC1FZsvjNc2a/TkF5x90yDhj+/8oGjAYMKgdWdaDER',
        'hVdN9dz0SG4Tp+xXZddXunkhgirL+/sBgL8QPXhApcs/gFYTO2uqh/STS8WotJg7Ch6lF6z7M',
        'smlwRtjKZkMeJKL62Am9F5JyVYfuSF46sPVifgr8qck9LMSrzOCasSJvTZoQNMaa9kskgHI3E',
        'LRnEE2yMsSdjon8hJ/w1UMC2KsQTtESNI4qqRA4H4oPWGsQT7IxahxKT5DzQVgfxBG1Rc38eU',
        '/EYW+to0CEciTt/A+WWlMZYp51NAAAAAElFTkSuQmCC'].
        join('')
    },
    rect: { width: 24, height: 47 },
    link: undefined,
    linklength: 20,
    endLine: undefined
  }
}, {
    markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/></g>',
    initialize: function () {
      this.resize(24, 47);

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
        this.attributes.link.markup = [
          '<path class="connection" stroke="black" d="M 0 0 0 0"/>',
          '<path class="marker-source" fill="black" stroke="black" d="M 0 0 0 0"/>',
          '<path class="marker-target" fill="black" stroke="black" d="M 0 0 0 0"/>'
        ].join('');
        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
        this.addTo(this.attributes.graph);
        this.attributes.endLine.addTo(this.attributes.graph);
        this.embed(this.attributes.endLine);
        this.attributes.endLine.position(6, 100, { parentRelative: true });
        this.embed(this.attributes.endLine);
        this.attributes.endLine.on('change:position', function(element, position) {
          let actor = element.getParentCell();
          let actorPosition = actor.position();
          element.position(actorPosition.x + 6, position.y);
          //alert('element1 moved to ' + position.x + ',' + position.y);
        });
        this.attributes.link.addTo(this.attributes.graph);
        this.embed(this.attributes.link);
      }
});
