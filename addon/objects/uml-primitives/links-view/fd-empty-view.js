import { isNone } from '@ember/utils';
import { computed, get } from '@ember/object';
import { isArray } from '@ember/array';
import { schedule } from '@ember/runloop';
import joint from 'npm:jointjs';
import $ from 'jquery';

export let EmptyView = joint.dia.LinkView.extend({
  updateInputsArray: computed(() => []).readOnly(),

  verticesChanging: false,

  initialize: function() {
    joint.dia.LinkView.prototype.initialize.apply(this, arguments);

    this.$box = $(this.template);
    this.model.inputElements = this.$box;

    this.model.on('change:source', function(element, newSource) {
      let objectModel = this.model.get('objectModel');
      if (objectModel) {
        if (!isNone(newSource.id)) {
          this.$box.css('visibility', 'visible');
          schedule('afterRender', this, function() {
            this.updateBox();
          });

          objectModel.set('source', newSource);
          objectModel.set('startPoint', this.sourcePoint);
          this.paper.trigger('checkexistelements', objectModel, this, true);
        } else {
          this.$box.css('visibility', 'hidden');
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
          });
          objectModel.set('target', newTarget);
          objectModel.set('endPoint', this.targetPoint);
          this.paper.trigger('checkexistelements', objectModel, this, false);
        } else {
          this.$box.css('visibility', 'hidden');
        }
      }
    }, this);

    this.model.on('change:vertices', function() {
      if (!this.verticesChanging) {
        this.verticesChanging = true;
        this.$box.css('visibility', 'hidden');
        this.paper.once('link:pointerup', function() {
          this.verticesChanging = false;
          this.$box.css('visibility', 'visible');
          schedule('afterRender', this, function() {
            this.updateBox();
          });
        }, this)
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
  }
});
