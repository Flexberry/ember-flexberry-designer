import Ember from 'ember';
import { SimplePredicate } from 'ember-flexberry-data/query/predicate';
import ListFormRoute from 'ember-flexberry/routes/list-form';

export default ListFormRoute.extend({
  /**
    Query simple predicate.

    @property modelProjection
    @type SimplePredicate
    @default undefined
    @private
  */
  _queryPredicate: undefined,

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
    @default 'fd-dev-view'
  */
  modelName: 'fd-dev-view',

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
  developerUserSettings: { FdViewListForm: {} },

  /**
   This hook is the first of the route entry validation hooks called when an attempt is made to transition into a route or one of its children.
   [More info](http://emberjs.com/api/classes/Ember.Route.html#method_beforeModel).

   @method beforeModel
   @param {Transition} transition
   @return {Promise}
 */
  beforeModel: function(transition) {
    let classId = transition.queryParams.classId;
    if (!Ember.isNone(classId)) {
      let queryPredicate = new SimplePredicate('class', '==', classId);
      this.set('_queryPredicate', queryPredicate);
    }
  },

  objectListViewLimitPredicate() {
    let queryPredicate = this.get('_queryPredicate');
    return queryPredicate;
  },
});
