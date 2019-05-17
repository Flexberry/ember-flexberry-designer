import { isNone } from '@ember/utils';
import joint from 'npm:jointjs';

export let EmptyView = joint.dia.LinkView.extend({

  initialize: function() {
    joint.dia.LinkView.prototype.initialize.apply(this, arguments);

    this.model.on('change:source', function(element, newSource) {
      let objectModel = this.model.get('objectModel');
      if (objectModel) {
        if (!isNone(newSource.id)) {
          objectModel.set('source', newSource);
          objectModel.set('startPoint', this.sourcePoint);
        } else {
          objectModel.set('startPoint', newSource);
        }

        this.model.trigger('uml-update');
      }
    }, this);

    this.model.on('change:target', function(element, newTarget) {
      let objectModel = this.model.get('objectModel');
      if (objectModel) {
        if (!isNone(newTarget.id)) {
          objectModel.set('target', newTarget);
          objectModel.set('endPoint', this.targetPoint);
        } else {
          objectModel.set('endPoint', newTarget);
        }

        this.model.trigger('uml-update');
      }
    }, this);
  }
});
