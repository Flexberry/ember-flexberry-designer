import ListFormRoute from 'ember-flexberry/routes/list-form';
import LimitByStageMixin from '../mixins/fd-limit-by-stage';

export default ListFormRoute.extend(LimitByStageMixin, {

  /**
    Name of model projection to be used as record's properties limitation.

    @property modelProjection
    @type String
    @default 'FormConstructor'
  */
  modelProjection: 'FormConstructor',

  /**
    Name of model to be used as list's records types.

    @property modelName
    @type String
    @default 'fd-dev-aggregation'
  */
  modelName: 'fd-dev-aggregation',

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
  developerUserSettings: { FdAggregationListForm: {} },
});
