import ListFormRoute from 'ember-flexberry/routes/list-form';
import FdLimitByStageMixin from '../mixins/fd-limit-by-stage';

export default ListFormRoute.extend(FdLimitByStageMixin, {
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
    @default 'fd-dev-class'
  */
  modelName: 'fd-dev-class',

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
  developerUserSettings: { FdClassListForm: {} },

  actions: {
    objectListViewRowClick(clazz, options) {
      if (options.column === null) {
        return this._super(...arguments);
      } else {
        this.get('currentContext').setCurrentClass(clazz);
        return this._super(...arguments);
      }
    },
  },

  willDestroy: function() {
    this.get('currentContext').setCurrentClass(undefined);
    this.super(...arguments);
  }
});
