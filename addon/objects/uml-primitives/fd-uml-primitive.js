/**
  @module ember-flexberry-designer
*/

import EmberObject from '@ember/object';
import { computed, get } from '@ember/object';
import { A, isArray } from '@ember/array';
import { isNone } from '@ember/utils';
import joint from 'npm:jointjs';
import $ from 'jquery';

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

    if (cellView.getSizeChangers instanceof Function) {
      this.addSizeChangers(cellView, id);
    }

    cellView.update();

    cellView.model.set('highlighted', true);
  },

  unhighlight: function(cellView, magnetEl, opt) {
    joint.highlighters.stroke.unhighlight(...arguments);
    let stroke = joint.highlighters.stroke;
    let id = stroke.getHighlighterId(magnetEl, opt);
    this.removeButtons(id);

    cellView.model.set('highlighted', false);
  },

  addSizeChangers(cellView, id) {
    const changers = cellView.getSizeChangers();

    changers.forEach(button => {
      let svgNS = 'http://www.w3.org/2000/svg';
      let g = document.createElementNS(svgNS, 'g');
      let name = get(button, 'name');
      g.setAttributeNS(null, 'class', name || '');
      let circle = document.createElementNS(svgNS, 'circle');
      let text = document.createElementNS(svgNS, 'text');
      text.innerHTML = get(button, 'text');
      g.appendChild(circle);
      g.appendChild(text);
      if (!isArray(this._buttons[id])) {
        this._buttons[id] = A();
      }

      this._buttons[id].addObject(g);
      cellView.vel.append(g);
      cellView.model.attr(`.${name}`, get(button, 'attrs.element'));
      cellView.model.attr(`.${name}>circle`, get(button, 'attrs.circle'));
      cellView.model.attr(`.${name}>text`, get(button, 'attrs.text'));
    }, this);
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
      g.onmousedown = this._onMouseDown;
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
  },

  removeButtons(id) {
    if (isArray(this._buttons[id])) {
      this._buttons[id].forEach(button => {
        button.remove();
      }, this);
    }

    this._buttons[id] = null;
  },

  _onMouseDown(e) {
    e.stopPropagation();
  }
};


export let primitiveElementViewCell = joint.shapes.basic.Generic.define('flexberry.uml.PrimitiveElementView');
joint.util.setByPath(joint.shapes, 'flexberry.uml.PrimitiveElementView', primitiveElementViewCell, '.');

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

  getSizeChangers() {
    return A([{
      name: 'right-size-button',
      text: '&#xf0da',
      attrs: {
        'element': { 'ref-dx': 0, 'ref-y': 0.5, 'ref': '.joint-highlight-stroke' },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
        'text': { fill: '#ffffff','font-size': 10, 'text-anchor': 'middle', x: 0.5, y: 3.5, 'font-family': 'Icons' },
      }
    }, {
      name: 'right-down-size-button',
      text: '&#xf0da',
      attrs: {
        'element': { 'ref-dx': 0, 'ref-dy': 0, 'ref': '.joint-highlight-stroke' },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
        'text': { fill: '#ffffff','font-size': 10, 'text-anchor': 'middle', x: 0.5, y: 3.5, 'transform': 'rotate(45)', 'font-family': 'Icons' },
      }
    }, {
      name: 'down-size-button',
      text: '&#xf0d7',
      attrs: {
        'element': { 'ref-x': 0.5, 'ref-dy': 0, 'ref': '.joint-highlight-stroke' },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
        'text': { fill: '#ffffff','font-size': 10, 'text-anchor': 'middle', x: 0, y: 3.5, 'font-family': 'Icons' },
      }
    }]);
  },

  removeElement(e) {
    e.stopPropagation();
    this.model.remove();
  },

  initialize: function() {
    joint.dia.ElementView.prototype.initialize.apply(this, arguments);

    if (!isNone(this.template)) {
      this.$box = $(this.template);
      this.model.inputElements = this.$box;
    }

    this.setColors();
  },

  getTextColor() {
    const objectModel = this.model.get('objectModel');
    if (!isNone(objectModel)) {
      const textColor = objectModel.get('primitive.DrawStyle.TextColor');
      if (!isNone(textColor)) {
        return 'rgba(' + [textColor.R, textColor.G, textColor.B, textColor.A].join(',') + ')';
      }
    }

    return;
  },

  getBrushColor() {
    const objectModel = this.model.get('objectModel');
    if (!isNone(objectModel)) {
      const brushColor = objectModel.get('primitive.DrawStyle.DrawBrush.Color');
      if (!isNone(brushColor)) {
        return 'rgba(' + [brushColor.R, brushColor.G, brushColor.B, brushColor.A].join(',') + ')';
      }
    }

    return;
  },

  setColors() {
    const textColor = this.getTextColor();
    const brushColor = this.getBrushColor();

    if (this.model.getRectangles instanceof Function && (!isNone(brushColor) || !isNone(textColor))) {
      const rects = this.model.getRectangles();
      rects.forEach(function(rect) {
        const className = 'flexberry-uml-' + rect.type + '-rect';
        if (this.markup.includes(className)) {
          if (!isNone(brushColor)) {
            this.attr(`.${className}/fill-opacity`, 1);
            this.attr(`.${className}/fill`, brushColor);
          }

          if (!isNone(textColor)) {
            this.attr(`.${className}/stroke`, textColor);
          }
        }
      }, this.model);
    }

    const inputElements = this.model.inputElements;
    if (!isNone(textColor) && isArray(inputElements)) {
      inputElements.each(function(index, input) {
        $(input).find('input, textarea').css('color', textColor);
      });
    }
  }
});

