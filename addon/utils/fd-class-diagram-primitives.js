import joint from 'npm:jointjs';

joint.shapes.basic.Generic.define('flexberryUml.Class', {
  attrs: {
    rect: { 'width': 200 },

    '.uml-class-name-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },
    '.uml-class-attrs-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },
    '.uml-class-methods-rect': { 'stroke': 'black', 'stroke-width': 1, 'fill': '#ffffff' },

    '.uml-class-name-text': {
      'ref': '.uml-class-name-rect',
      'ref-y': 0.5,
      'ref-x': 0.5,
      'text-anchor': 'middle',
      'y-alignment': 'middle',
      'font-weight': 'bold',
      'fill': 'black',
      'font-size': 12,
      'font-family': 'Arial',
    },

    '.uml-class-name-text tspan[x]': { 'font-weight': 'normal' },
    '.uml-class-attrs-text': {

      'ref': '.uml-class-attrs-rect', 'ref-y': 5, 'ref-x': 5,
      'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
    },
    '.uml-class-methods-text': {
      'ref': '.uml-class-methods-rect', 'ref-y': 5, 'ref-x': 5,
      'fill': 'black', 'font-size': 12, 'font-family': 'Arial'
    }
  },

  name: [],
  stereotype:[],
  attributes: [],
  methods: []
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-methods-rect"/>',
    '</g>',
    '<text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-methods-text"/>',
    '</g>'
  ].join(''),

  initialize: function() {

    this.on('change:name change:attributes change:methods', function() {
      this.updateRectangles();
      this.trigger('uml-update');
    }, this);

    this.updateRectangles();

    joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
  },

  getClassName: function() {
    let stereotype = this.get('stereotype').length > 0 ? '<<' + this.get('stereotype') + '>>' : '';
    return [this.get('name'), stereotype];
  },

  updateRectangles: function() {

    var attrs = this.get('attrs');

    var rects = [
      { type: 'name', text: this.getClassName() },
      { type: 'attrs', text: this.get('attributes') },
      { type: 'methods', text: this.get('methods') }
    ];

    var offsetY = 0;

    rects.forEach(function(rect) {

      var lines = Array.isArray(rect.text) ? rect.text : [rect.text];
      var rectHeight = lines.length * 20 + 20;

      attrs['.uml-class-' + rect.type + '-text'].text = lines.join('\n');
      attrs['.uml-class-' + rect.type + '-rect'].height = rectHeight;
      attrs['.uml-class-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';

      offsetY += rectHeight;
    });
  }
});

joint.shapes.flexberryUml.Class.define('flexberryUml.Object', {
  attrs: {
    '.uml-class-name-text': {
      'text-decoration': 'underline'
    },
  },
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/>',
    '</g>',
    '<text class="uml-class-name-text"/><text class="uml-class-attrs-text"/>',
    '</g>'
  ].join(''),

  getClassName: function() {
    return [this.get('name')];
  },
});

joint.shapes.basic.Rhombus.define('flexberryUml.NAryAssociation', {
  attrs: {
    text: {
      'text-decoration': 'underline',
      'font-size':'12'
    }
  }
});

joint.shapes.basic.Rect.define('flexberryUml.Instance', {
  attrs: {
    text: {
      'text-decoration': 'underline',
      'font-size':'12'
    }
  }
});

joint.shapes.basic.Rect.define('flexberryUml.MultiObject', {
  attrs: {
    text: {
      'text-decoration': 'underline',
      'font-size':'12'
    }
  }
}, {
  markup: [
    '<g class="rotatable">',
    '<g class="scalable">',
    '<rect transform="translate(3, 10)"/><rect/>',
    '</g>',
    '<text/>',
    '</g>'
  ].join('')
});

joint.shapes.flexberryUml.Instance.define('flexberryUml.ActiveObject', {
  attrs: {
    text: {
      'font-weight':'bold'
    }
  }
});

joint.dia.Link.define('flexberryUml.Aggregation', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'white' } },
  labels: [{
    position: { distance: 10, offset: -15 }, attrs: { text: { text:  '*' } } }, {
    position: { distance: -40, offset: -15 }, attrs: { text: { text:  '1' } }
  }]
});

joint.dia.Link.define('flexberryUml.Qualified', {
  attrs: { '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 z', fill: 'white' } },
});

joint.dia.Link.define('flexberryUml.QualifiedAggregation', {
  attrs: {
    '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'white' }
  },
});

joint.dia.Link.define('flexberryUml.QualifiedComposition', {
  attrs: {
    '.marker-target': { d: 'M 26 10 L 26 3 L 0 3 L 0 17 L 26 17 L 26 10 M 52 10 L 39 17 L 26 10 L 39 3 z', fill: 'url(#solids)' }
  },
}, {

  initialize: function() {
    // called from Backbone constructor
    // call base initialize()
    joint.dia.Link.prototype.initialize.apply(this, arguments);

    // link markup is so complex that we need to fetch its definition
    var markup = (this.markup || this.get('markup'));

    // append <linearGradient> to markup, so that it covers whole path
    markup += '<linearGradient id="solids" x1="0%" y1="0%" x2="100%" y2="0%">' +
      '<stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
      '<stop offset="50%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
      '<stop offset="50%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' +
      '<stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:1" />' +
      '</linearGradient>';
    this.set('markup', markup);
  }
});

joint.dia.Link.define('flexberryUml.Composition', {
  attrs: { '.marker-target': { d: 'M 26 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' } },
  labels: [{
    position: { distance: 10, offset: -15 }, attrs: { text: { text:  '*' } } }, {
    position: { distance: -40, offset: -15 }, attrs: { text: { text:  '1' } }
  }]
});

joint.dia.Link.define('flexberryUml.Dependency', {
  attrs: {
    '.marker-target': { d: 'M 0 10 L 13 17 L 0 10 L 13 3 z', fill: 'black' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
  },
});

joint.dia.Link.define('flexberryUml.Realization', {
  attrs: {
    '.marker-target': { d: 'M 0 0 z' },
    '.connection': { stroke: 'black', 'stroke-width': 1, 'stroke-dasharray': '7 2' },
  },
});

joint.dia.Link.define('flexberryUml.Association', {
  labels: [{
    position: { distance: 10, offset: -15 }, attrs: { text: { text:  '*' } } }, {
    position: { distance: -10, offset: -15 }, attrs: { text: { text:  '1' } }
  }]
});

joint.dia.Link.define('flexberryUml.Generalization', {
  attrs: { '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' } }
});

joint.dia.Link.define('flexberryUml.NestedClassAssociation', {
  attrs: { '.marker-target': { d: 'M 10, 10 ' +
                'm -8, 0 ' +
                'a 8,8 0 1,0 16,0 ' +
                'a 8,8 0 1,0 -16,0 M 10 2 L 10 2 L 10 18', fill: 'transparent' } }
});
