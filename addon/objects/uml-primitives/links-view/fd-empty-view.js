import { isNone } from '@ember/utils';
import { computed, get } from '@ember/object';
import { A, isArray } from '@ember/array';
import { schedule } from '@ember/runloop';
import joint from 'npm:jointjs';
import $ from 'jquery';
import { forPointerMethodOverrideResizeAndDnd } from '../../../utils/fd-update-coordinate-for-firefox';

export let EmptyView = joint.dia.LinkView.extend({
  updateInputsArray: computed(() => []).readOnly(),

  verticesChanging: false,

  initialize: function() {
    joint.dia.LinkView.prototype.initialize.apply(this, arguments);

    this.$box = $(this.template);
    this.model.inputElements = this.$box;
    this.$el.addClass('linktools-disabled')

    this.setColors();
    this.setButtonStyles();

    this.model.on('change:source', function(element, newSource) {
      let objectModel = this.model.get('objectModel');
      if (objectModel) {
        if (!isNone(newSource.id)) {
          this.$box.css('visibility', 'visible');
          schedule('afterRender', this, function() {
            this.updateBox();
            this.highlight();
          });

          objectModel.set('source', newSource);
          objectModel.set('startPoint', this.sourcePoint);
          this.paper.trigger('checkexistelements', objectModel, this, true);
        } else {
          this.$box.css('visibility', 'hidden');
          this.unhighlight();
        }
      }
    }, this);

    this.model.on('change:target', function(element, newTarget) {
      let objectModel = this.model.get('objectModel');
      if (objectModel) {
        if (!isNone(newTarget.id)) {
          this.$box.css('visibility', 'visible');
          schedule('afterRender', this, function() {
            this.updateBox();
            this.highlight();
          });
          objectModel.set('target', newTarget);
          objectModel.set('endPoint', this.targetPoint);
          this.paper.trigger('checkexistelements', objectModel, this, false);
        } else {
          this.$box.css('visibility', 'hidden');
          this.unhighlight();
        }
      }
    }, this);

    this.model.on('change:vertices', function() {
      if (!this.verticesChanging) {
        this.verticesChanging = true;
        this.$box.css('visibility', 'hidden');
        this.unhighlight();
        if (!this.$el.hasClass('edit-disabled')) {
          this.paper.once('link:pointerup', function() {
            this.verticesChanging = false;
            this.$box.css('visibility', 'visible');
            schedule('afterRender', this, function() {
              this.updateBox();
              this.highlight();
            });
          }, this)
        } else {
          this.verticesChanging = false;
        }
      }
    }, this);
  },

  updateBox() {
    this.updateInputsWidth(get(this, 'updateInputsArray'));
  },

  updateInputsWidth(inputSelectors) {
    let selectors = isArray(inputSelectors) ? inputSelectors : [inputSelectors];
    let $buffer = this.$box.find('.input-buffer');
    selectors.forEach((selector) => {
      this.updateInputWidth(selector, $buffer);
    }, this);
  },

  updateInputWidth(selector, buffer) {
    buffer = buffer || this.$box.find('.input-buffer');
    let $input = this.$box.find(selector);
    buffer.css('font-weight', $input.css('font-weight'));
    buffer.text($input.val());
    $input.width(buffer.width() + 1);
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

    if (!isNone(textColor)) {
      this.model.attr('.connection/stroke', textColor);
    }

    const inputElements = this.model.inputElements;
    if (isArray(inputElements) && (!isNone(textColor) || !isNone(brushColor))) {
      inputElements.each(function(index, input) {
        if (!isNone(textColor)) {
          $(input).find('input, textarea').css('color', textColor);
        }

        if (!isNone(brushColor)) {
          $(input).find('input, textarea').css('background-color', brushColor);
        }
      });
    }
  },

  setButtonStyles() {
    const _this = this;
    const buttons = this.getButtons();
    buttons.forEach(button => {
      let style = {};
      style[`.${get(button, 'name')}`] = get(button, 'attrs.element');
      style[`.${get(button, 'name')}>circle`] = get(button, 'attrs.circle');
      style[`.${get(button, 'name')}>text`] = get(button, 'attrs.text');
      _this.model.attr(style);
    });
  },

  pointerdblclick: function(evt, x, y) {
    let readonly = this.paper.options.interactive;
    if (!isNone(readonly) && typeof readonly === 'object') {
      this.addVertex(x, y);
      this.unhighlight();
      this.highlight();
      this.verticesChanging = false
    }
  },

  getButtons() {
    if (this.paper) {
      let readonly = this.paper.options.interactive;
      if (!readonly && typeof readonly !== 'object') {
        return A();
      }
    }

    return A([{
      name: 'remove-button',
      text: '&#xe915',
      handler: this.removeLink.bind(this),
      attrs: {
        'element': { atConnectionRatio: .2 },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1, 'cursor': 'pointer' },
        'text': { fill: '#ffffff','font-size': 7, 'text-anchor': 'middle', x: 0, y: 3, 'font-family': 'fd-icons', visibility: 'visible', 'cursor': 'pointer' },
      }
    },  {
      name: 'color-button',
      text: '&#xf1fc',
      handler: this.changeColorElement.bind(this),
      attrs: {
        'element': { atConnectionRatio: .3 },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
        'text': { fill: '#ffffff','font-size': 7, 'text-anchor': 'middle', x: 0, y: 2, 'font-family': 'Icons', visibility: 'visible', 'cursor': 'pointer' },
      }
    },  {
      name: 'color-button',
      text: '&#xe3b7',
      handler: this.changeColorElement.bind(this),
      attrs: {
        'element': { atConnectionRatio: .3 },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
        'text': { fill: '#ffffff','font-size': 10, 'text-anchor': 'middle', x: 0, y: 3, 'font-family': 'Icons' },
      }
    }]);
  },

  removeLink(e) {
    e.stopPropagation();
    this.model.remove();
  },

  changeColorElement(e) {
    e.stopPropagation();
    this.paper.trigger('element:openpopup', this, $(e.currentTarget));
  },

  /**
    Update coordinates for FF.
  */
  pointerdown(evt, x, y) {
    $(this.paper.el).find('input,textarea').addClass('click-disabled');
    let coordinates = forPointerMethodOverrideResizeAndDnd(evt, x, y);
    joint.dia.LinkView.prototype.pointerdown.apply(this, [evt, coordinates.x, coordinates.y]);
  },

  pointermove(evt, x, y) {
    let coordinates = forPointerMethodOverrideResizeAndDnd(evt, x, y);
    joint.dia.LinkView.prototype.pointermove.apply(this, [evt, coordinates.x, coordinates.y]);
  },

  pointerup(evt, x, y) {
    $(this.paper.el).find('input,textarea').removeClass('click-disabled');
    let coordinates = forPointerMethodOverrideResizeAndDnd(evt, x, y);
    joint.dia.LinkView.prototype.pointerup.apply(this, [evt, coordinates.x, coordinates.y]);
  }
});
