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

          if (this.oldSourceValue) {
            if (!get(this, 'oldSourceValue.connectionPoint.args.coords')) {
              this.oldSourceValue.connectionPoint = { name: 'toPointConnection', args: { coords: this.sourcePoint } };
            }

            if (this.oldSourceValue.id) {
              this.triggerHistoryStep('source', newSource, this.oldSourceValue);
            }

            this.oldSourceValue = undefined;
          }

          objectModel.set('source', newSource);
          objectModel.set('startPoint', this.sourcePoint);
          this.paper.trigger('checkexistelements', objectModel, this, true);
        } else {
          if (!this.oldSourceValue) {
            this.oldSourceValue = this.model.previous('source');
            this.$box.css('visibility', 'hidden');
            this.unhighlight();
          }
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

          if (this.oldTargetValue) {
            if (!get(this, 'oldTargetValue.connectionPoint.args.coords')) {
              this.oldTargetValue.connectionPoint = { name: 'toPointConnection', args: { coords: this.targetPoint } };
            }

            if (this.oldTargetValue.id) {
              this.triggerHistoryStep('target', newTarget, this.oldTargetValue);
            }

            this.oldTargetValue = undefined;
          }

          objectModel.set('target', newTarget);
          objectModel.set('endPoint', this.targetPoint);
          this.paper.trigger('checkexistelements', objectModel, this, false);
        } else {
          if (!this.oldTargetValue) {
            this.oldTargetValue = this.model.previous('target');
            this.$box.css('visibility', 'hidden');
            this.unhighlight();
          }
        }
      }
    }, this);

    this.model.on('change:vertices', function() {
      if (!this.verticesChanging) {
        this.verticesChanging = true;
        this.$box.css('visibility', 'hidden');
        this.unhighlight();
        if (!this.$el.hasClass('edit-disabled')) {
          this.paper.once('link:pointerup', this._verticesChanged, this);
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
      this._setVerticesValue();
      this.addVertex(x, y);
      this.paper.off('link:pointerup', this._verticesChanged, this);
      this._verticesChanged();
      this._checkVerticesChanges();
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
      text: '&#xe827',
      title: window.i18n.t('components.fd-diagram-editing-panel.remove-button-title').string,
      handler: this.removeLink.bind(this),
      attrs: {
        'element': { atConnectionRatio: .2 },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1, 'cursor': 'pointer' },
        'text': { fill: '#ffffff','font-size': 8, 'text-anchor': 'middle', x: 0, y: 2, 'font-family': 'fd-icons', visibility: 'visible', 'cursor': 'pointer' },
      }
    },  {
      name: 'color-button',
      text: '&#xf1fc',
      title: window.i18n.t('components.fd-diagram-editing-panel.color-button-title').string,
      handler: this.changeColorElement.bind(this),
      attrs: {
        'element': { atConnectionRatio: .3 },
        'circle': { r: 6, fill: '#007aff', stroke: '#007aff', 'stroke-width': 1 },
        'text': { fill: '#ffffff','font-size': 7, 'text-anchor': 'middle', x: 0, y: 2, 'font-family': 'Icons', visibility: 'visible', 'cursor': 'pointer' },
      }
    }]);
  },

  removeLink(e) {
    e.stopPropagation();
    const linkJson = JSON.stringify(this.model.get('objectModel'));
    this.triggerHistoryStep('Delete', null, linkJson);
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
    this._setVerticesValue();
    let readonly = this.paper.options.interactive;
    if (readonly && typeof readonly === 'object') {
      $(this.paper.el).find('input,textarea').addClass('click-disabled');
    }

    let coordinates = forPointerMethodOverrideResizeAndDnd(evt, x, y);
    joint.dia.LinkView.prototype.pointerdown.apply(this, [evt, coordinates.x, coordinates.y]);
  },

  pointermove(evt, x, y) {
    let coordinates = forPointerMethodOverrideResizeAndDnd(evt, x, y);
    joint.dia.LinkView.prototype.pointermove.apply(this, [evt, coordinates.x, coordinates.y]);
  },

  pointerup(evt, x, y) {
    this._checkVerticesChanges();
    let readonly = this.paper.options.interactive;
    if (readonly && typeof readonly === 'object') {
      $(this.paper.el).find('input,textarea').removeClass('click-disabled');
    }

    let coordinates = forPointerMethodOverrideResizeAndDnd(evt, x, y);
    joint.dia.LinkView.prototype.pointerup.apply(this, [evt, coordinates.x, coordinates.y]);
  },

  triggerHistoryStep(propName, newValue, oldValue) {
    let changes = A();

    const objectModel = this.model.get('objectModel');
    changes.addObject({ field: propName, oldValue: oldValue || objectModel.get(propName), newValue: newValue });
    this.model.graph.trigger('history:add', this.model.get('id'), changes);
  },

  _setVerticesValue() {
    this.needStepOnConnect = true;
    const objectModel = this.model.get('objectModel');
    this.oldVerticesValue = {
      vertices: objectModel.get('vertices'),
      source: objectModel.get('source'),
      target: objectModel.get('target'),
      endPoint: objectModel.get('endPoint'),
      startPoint: objectModel.get('startPoint')
    };
  },

  _checkVerticesChanges() {
    const objectModel = this.model.get('objectModel');
    const oldObjectModel = this.oldVerticesValue;
    const vertices = objectModel.get('vertices');
    if (JSON.stringify(oldObjectModel.vertices) !== JSON.stringify(vertices)) {
      this.triggerHistoryStep('vertices', vertices, oldObjectModel.vertices);
    }

    /*if (JSON.stringify(oldObjectModel.source) !== JSON.stringify(objectModel.get('source')) ||
      JSON.stringify(oldObjectModel.startPoint) !== JSON.stringify(objectModel.get('startPoint'))) {
        let changes = A();

        const objectModel = this.model.get('objectModel');
        changes.addObject({ field: 'source', oldValue: oldObjectModel.source, newValue: objectModel.get('source') });
        changes.addObject({ field: 'startPoint', oldValue: oldObjectModel.startPoint, newValue: objectModel.get('startPoint') });
        this.model.graph.trigger('history:add', this.model.get('id'), changes);
    }

    if (JSON.stringify(oldObjectModel.target) !== JSON.stringify(objectModel.get('target')) ||
      JSON.stringify(oldObjectModel.endPoint) !== JSON.stringify(objectModel.get('endPoint'))) {
        let changes = A();

        const objectModel = this.model.get('objectModel');
        changes.addObject({ field: 'target', oldValue: oldObjectModel.target, newValue: objectModel.get('target') });
        changes.addObject({ field: 'endPoint', oldValue: oldObjectModel.endPoint, newValue: objectModel.get('endPoint') });
        this.model.graph.trigger('history:add', this.model.get('id'), changes);
    }*/
  },

  _verticesChanged() {
    this.verticesChanging = false;
    this.$box.css('visibility', 'visible');
    schedule('afterRender', this, function() {
      this.updateBox();
      this.highlight();
    });
  }
});
