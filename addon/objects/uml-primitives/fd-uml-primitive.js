/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';
import { computed, get } from '@ember/object';
import { A, isArray } from '@ember/array';
import joint from 'npm:jointjs';

/**
  An object that defines any primitive on the UML diagram.

  @class FdUmlPrimitive
  @extends <a href="http://emberjs.com/api/classes/Ember.Object.html">Ember.Object</a>
*/
export default EmberObject.extend({

  /**
    The object that describes the primitive.

    @property primitive
    @type Object
  */
  primitive: undefined,

  /**
    The unique identifier of the primitive.

    @property id
    @type String
  */
  id: computed.readOnly('primitive.$id'),

  /**
    The unique identifier of the object.

    @property repositoryObject
    @type String
  */
  repositoryObject: computed.alias('primitive.RepositoryObject'),

  /**
    Returns the string representation of the primitive.

    @method toString
    @return {String} A string representation of the primitive.
  */
  toString() {
    return JSON.stringify(this.get('primitive'));
  },

  /**
    Returns the object to convert to the JSON.

    @method toJSON
    @return {Object} A object to convert to the JSON.
  */
  toJSON() {
    return this.get('primitive');
  },

  /**
    Returns an object for the JointJS diagram model.

    @method JointJS
    @return {joint.shapes} Object for the JointJS diagram model.
  */
  JointJS() {
    throw new Error('Not implemented.');
  },
});

joint.highlighters.strokeAndButtons = {
  _buttons: {},

  highlight: function(cellView, magnetEl, opt) {
    //joint.highlighters.stroke.highlight(...arguments);
    let stroke = joint.highlighters.stroke;
    let V = joint.Vectorizer;

    let id = stroke.getHighlighterId(magnetEl, opt);

    // Only highlight once.
    if (stroke._views[id]) {
      return;
    }

    let options = joint.util.defaults(opt || {}, stroke.defaultOptions);
    let magnetVel = V(magnetEl);
    let magnetBBox;
    let pathData;

    try
    {
      pathData = magnetVel.convertToPathData();
    }
    catch (error)
    {
      // Failed to get path data from magnet element.
      // Draw a rectangle around the entire cell view instead.
      magnetBBox = magnetVel.bbox(true/* without transforms */);
      pathData = V.rectToPath(joint.util.assign({}, options, magnetBBox));
    }

    let highlightVel = V('path').attr({
      'd': pathData,
      'pointer-events': 'none',
      'vector-effect': 'non-scaling-stroke',
      'fill': 'none'
    }).attr(options.attrs);

    let highlightMatrix = magnetVel.getTransformToElement(cellView.el);

    // Add padding to the highlight element.
    let padding = options.padding;
    if (padding) {
      magnetBBox || (magnetBBox = magnetVel.bbox(true));

      let cx = magnetBBox.x + (magnetBBox.width / 2);
      let cy = magnetBBox.y + (magnetBBox.height / 2);

      magnetBBox = V.transformRect(magnetBBox, highlightMatrix);

      let width = Math.max(magnetBBox.width, 1);
      let height = Math.max(magnetBBox.height, 1);
      let sx = (width + padding) / width;
      let sy = (height + padding) / height;
      let paddingMatrix = V.createSVGMatrix({
        a: sx,
        b: 0,
        c: 0,
        d: sy,
        e: cx - sx * cx,
        f: cy - sy * cy
      });

      highlightMatrix = highlightMatrix.multiply(paddingMatrix);
    }

    highlightVel.transform(highlightMatrix);

    // joint.mvc.View will handle the theme class name and joint class name prefix.
    let highlightView = stroke._views[id] = new joint.mvc.View({
      svgElement: true,
      className: 'highlight-stroke',
      el: highlightVel.node
    });

    // Remove the highlight view when the cell is removed from the graph.
    let removeHandler = function() {
      this.removeButtons(id);
      stroke.removeHighlighter.bind(stroke, id);
    }.bind(this);

    let cell = cellView.model;
    highlightView.listenTo(cell, 'remove', removeHandler);
    highlightView.listenTo(cell.graph, 'reset', removeHandler);

    cellView.vel.append(highlightVel);
    if (cellView.getButtons instanceof Function) {
      this.addButtons(cellView, id);
    }

    $(magnetEl.firstChild.children).attr({'fill-opacity':'1'});
    cellView.model.set('highlighted', true);
  },

  unhighlight: function(cellView, magnetEl, opt) {
    joint.highlighters.stroke.unhighlight(...arguments);
    let stroke = joint.highlighters.stroke;
    let id = stroke.getHighlighterId(magnetEl, opt);
    this.removeButtons(id);
    $(magnetEl.firstChild.children).attr({'fill-opacity':'0'});

    cellView.model.set('highlighted', false);
  },

  addButtons(cellView, id) {
    let buttons = cellView.getButtons();
    buttons.forEach(button => {
      let svgNS = 'http://www.w3.org/2000/svg';
      let g = document.createElementNS(svgNS, 'g');
      let name = get(button, 'name');
      g.setAttributeNS(null, 'class', name || '');
      let circle = document.createElementNS(svgNS, 'circle');
      let text = document.createElementNS(svgNS, 'text');
      text.innerHTML = get(button, 'text');
      g.appendChild(circle);
      g.appendChild(text);
      g.onclick = get(button, 'handler');
      if (!isArray(this._buttons[id])) {
        this._buttons[id] = A();
      }

      this._buttons[id].addObject(g);
      cellView.vel.append(g);
      cellView.model.attr(`.${name}`, get(button, 'attrs.element'));
      cellView.model.attr(`.${name}>circle`, get(button, 'attrs.circle'));
      cellView.model.attr(`.${name}>text`, get(button, 'attrs.text'));
    }, this);

    cellView.update();
  },

  removeButtons(id) {
    if (isArray(this._buttons[id])) {
      this._buttons[id].forEach(button => {
        button.remove();
      }, this);
    }

    this._buttons[id] = null;
  }
};

joint.shapes.basic.Generic.define('flexberry.uml.PrimitiveElementView');
joint.shapes.flexberry.uml.PrimitiveElementView = joint.dia.ElementView.extend({
  getButtons() {
    return A([{
      name: 'remove-button',
      text: '&#xf00d',
      handler: this.removeElement.bind(this),
      attrs: {
        'element': {'ref-dx': 0,'ref-y': 0, 'ref': '.joint-highlight-stroke' },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
        'text': { fill: '#ffffff','font-size': 10, 'text-anchor': 'middle', x: 0, y: 3, 'font-family': 'Icons' },
      }
    }]);
  },

  removeElement(e) {
    e.stopPropagation();
    this.model.remove();
  },
});
