/*export default function fdSequenceDiagramPrimitives() {
  return true;
}
*/
import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberryUml.Actor', {
  position: { x: 50, y: 50 },
  size: { width: 24, height: 47 },
  attrs: {
      text: { text: 'Actor' },
      image: { 'xlink:href': ['data:image/png;base64,',
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
      }
  },
  markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/><text/></g>',
  initialize: function() {
    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  }
});
