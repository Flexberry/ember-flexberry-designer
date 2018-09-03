import Ember from 'ember';
import ListFormRoute from 'ember-flexberry/routes/list-form';
import FdLoadingForTransitionMixin from '../mixins/fd-loading-for-transition';

export default ListFormRoute.extend(FdLoadingForTransitionMixin, {
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
    @default 'fd-configuration'
  */
  modelName: 'fd-configuration',

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
  developerUserSettings: {
    FdConfigurationListForm: {
      'DEFAULT': {
        'columnWidths': [{ 'propName': 'OlvRowMenu', 'fixed': true, 'width': 68 }]
      }
    }
  },

  /**
    Link to {{#crossLink "FdCurrentProjectContextService"}}FdCurrentProjectContextService{{/crossLink}}.

    @property currentContext
    @type FdCurrentProjectContextService
  */
  currentContext: Ember.inject.service('fd-current-project-context'),

  actions: {
    objectListViewRowClick(configuration, options) {
      if (options.column === null) {
        return this._super(...arguments);
      } else {
        this.get('currentContext').setCurrentConfiguration(configuration);
        this.transitionTo('fd-stage-list-form');
      }
    },
  },
});
