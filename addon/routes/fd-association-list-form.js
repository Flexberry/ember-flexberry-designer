import ListFormRoute from 'ember-flexberry/routes/list-form';
import LimitByStageMixin from '../mixins/fd-limit-by-stage';

export default ListFormRoute.extend(LimitByStageMixin, {

  /**
    A hook you can implement to convert the URL into the model for this route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_model).

    @method model
    @param {Object} params
    @param {Object} transition
   */
  model: function() {
    let store = this.get('store');
    let records = store.peekAll('fd-dev-association');
    return records;
  },

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
    @default 'fd-dev-association'
  */
  modelName: 'fd-dev-association',

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
  developerUserSettings: { FdAssociationListForm: {} },
});
