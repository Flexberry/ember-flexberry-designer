import FdBaseSheet from './fd-base-sheet';
import Builder from 'ember-flexberry-data/query/builder';
import GenerationStateEnum from '../../enums/new-platform-flexberry-web-designer-generation-state';
import { run } from '@ember/runloop';
import { computed, get, set } from '@ember/object';
import { isNone } from '@ember/utils';

import layout from '../../templates/components/fd-sheets/fd-generation-sheet';

export default FdBaseSheet.extend({
  layout,

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default 'generation-sheet'
  */
  sheetComponentName: 'generation-sheet',

  /**
    Value selected view.

    @property selectedValue
    @type Object
  */
  selectedValue: undefined,

  /**
    Time-sorted generation steps.

    @property generationLog
    @type Ember.NativeArray
  */
  generationSteps: computed.sort('selectedValue.data.stepLogs', '_stepsSorting'),

  /**
    Description of sorting for {{#crossLink "FdGenerationListLogController/generationSteps:property"}}generation steps{{/crossLink}}.
    @property _stepsSorting
    @type Array
    @default ['time']
  */
  _stepsSorting: undefined,

  /**
    Timer information for use in canceling log updating.

    @property _timer
    @type Any
  */
  _timer: undefined,

  /**
    Opening sheet.

     @method openSheet
     @param {String} sheetName Sheet's name.
     @param {Object} currentItem Current list item.
  */
  openSheet(sheetName, currentItem) {
    this.deactivateListItem();
    this.set('selectedValue', currentItem);

    if (get(currentItem, 'model.data.isRunning')) {
      this.updateLog();
    }
  },

  /**
    Closing sheet.

     @method closeSheet
  */
  closeSheet() {
    this.deactivateListItem();
    this.set('selectedValue', undefined);
    this.stopUpdate();
  },

  /**
    Deactivate item from selectedValue.

     @method deactivateListItem
  */
  deactivateListItem() {
    let selectedValue = this.get('selectedValue');
    if (!isNone(selectedValue)) {
      set(selectedValue, 'active', false);
    }
  },


  init() {
    this._super(...arguments);

    this.set('_stepsSorting', ['time']);
  },

  /**
    Updates the log until generation completes.

    @method updateLog
  */
  updateLog() {
    let store = this.get('store');
    let modelName = 'fd-generation';
    let projectionName = 'EditFormView';

    let builder = new Builder(store)
      .from(modelName)
      .selectByProjection(projectionName)
      .byId(this.get('selectedValue.data.id'));

    store.queryRecord(modelName, builder.build()).then((generation) => {
      this.set('selectedValue.data', generation);

      if (generation.get('isRunning')) {
        this.set('_timer', run.later(this, this.updateLog, 5000));
      } else {
        this.set('_timer', undefined);

        let generationValue = this.get('selectedValue');
        this.get('model.run').removeObject(generationValue);

        let model;
        switch (generation.get('state')) {
          case `${GenerationStateEnum.Running}`:
            model = this.get('model.run');
            break;
          case `${GenerationStateEnum.Success}`:
            model = this.get('model.success');
            break;
          case `${GenerationStateEnum.Error}`:
            model = this.get('model.error');
            break;
          default:
            model = this.get('model.other');
        }

        model.unshiftObject(generationValue);
        this.get('updateModel')();
      }
    });
  },

  /**
    Stops updating the log.

    @method stopUpdate
  */
  stopUpdate() {
    let timer = this.get('_timer');
    if (timer) {
      run.cancel(timer);
    }
  }
});
