import { inject } from '@ember/service';

import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import FdPreloadStageMetadata from 'ember-flexberry-designer/utils/fd-preload-stage-metadata';
import ListFormRoute from 'ember-flexberry/routes/list-form';

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
    @default 'fd-dev-stage'
  */
  modelName: 'fd-dev-stage',

  /**
    Service for managing the state of the application.
     @property appState
    @type AppStateService
  */
  appState: inject(),

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

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: inject('fd-current-project-context'),

  actions: {
    objectListViewRowClick(stage, options) {
      if (options.column === null) {
        return this._super(...arguments);
      } else {
        this.get('currentContext').setCurrentStage(stage);
        this.get('appState').loading();
        FdPreloadStageMetadata.call(this, this.get('store'), this.get('currentContext').getCurrentStage()).then(() =>
          this.get('currentContext').getAutogeneratedSystemPromise()).then(() => {
            this.get('appState').reset();
            this.transitionTo('fd-appstruct-form');
          });
      }
    },
  },

  objectListViewLimitPredicate() {
    let configuration = this.get('currentContext').getCurrentConfiguration();
    return new SimplePredicate('configuration', '==', configuration);
  },

  init() {
    this._super(...arguments);

    this.set('developerUserSettings', {
      FdStageListForm: {
        'DEFAULT': {
          'columnWidths': [{ 'propName': 'OlvRowMenu', 'fixed': true, 'width': 68 }]
        }
      }
    });
  }
});
