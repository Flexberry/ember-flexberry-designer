import { inject } from '@ember/service';
import { merge } from '@ember/polyfills';
import { isNone } from '@ember/utils'

import ListFormRoute from 'ember-flexberry/routes/list-form';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import FilterOperator from 'ember-flexberry-data/query/filter-operator';

export default ListFormRoute.extend({
  /**
    Name of model projection to be used as record's properties limitation.

    @property modelProjection
    @type String
    @default 'ListFormView'
  */
  modelProjection: 'ListFormView',

  /**
    Name of model to be used as list's records types.

    @property modelName
    @type String
    @default 'fd-generation'
  */
  modelName: 'fd-generation',

  /**
    Defined user settings developer.
    For default userSetting use empty name ('').
    Property `<componentName>` may contain any of properties: `colsOrder`, `sorting`, `colsWidth` or being empty.

    ```javascript
    {
      <componentName>: {
        <settingName>: {
          colsOrder: [ { propName :<colName>, hide: true|false }, ... ],
          sorting: [{ propName: <colName>, direction: "asc"|"desc" }, ... ],
          colsWidths: [ <colName>:<colWidth>, ... ],
        },
        ...
      },
      ...
    }
    ```

    @property developerUserSettings
    @type Object
    @default {}
  */
  developerUserSettings: undefined,

  currentProjectContext: inject('fd-current-project-context'),

  /**
    It overrides base method and forms the limit predicate for loaded data.
    If there is displayed even number or records per page, records where 'address' attribute contains letter 'S' are filtered.
    If there is displayed odd number or records per page, records where 'address' attribute contains letter 'п' are filtered.

    @public
    @method objectListViewLimitPredicate
    @param {Object} options Method options.
    @param {String} [options.modelName] Type of records to load.
    @param {String} [options.projectionName] Projection name to load data by.
    @param {String} [options.params] Current route query parameters.
    @return {BasePredicate} The predicate to limit loaded data.
   */
  objectListViewLimitPredicate: function(options) {
    let methodOptions = merge({
      modelName: undefined,
      projectionName: undefined,
      params: undefined
    }, options);

    if (methodOptions.modelName === this.get('modelName') &&
        methodOptions.projectionName === this.get('modelProjection')) {
      let stage = this.get('currentProjectContext').getCurrentStage();
      if (!isNone(stage)) {
        return new SimplePredicate('stage', FilterOperator.Eq, stage);
      }
    }

    return undefined;
  },

  init() {
    this._super(...arguments);

    this.set('developerUserSettings', {
      FdGenerationListForm: {
        'DEFAULT': {
          'columnWidths': [
            { 'propName': 'generationReason', 'width': 250 },
            { 'propName': 'state', 'width': 100 },
            { 'propName': 'percentComplete', 'width': 100 },
          ],
          'colsOrder': [{ 'propName': 'userName' }, { 'propName': 'state' }, { 'propName': 'percentComplete' },
          { 'propName': 'startTime' }, { 'propName': 'endTime' }, { 'propName': 'stage.name' }, { 'propName': 'generationReason' }],
          'sorting': [{ 'propName': 'startTime', 'direction': 'desc' }]
        }
      }
    });
  }
});
