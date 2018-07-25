import Ember from 'ember';
import { Query } from 'ember-flexberry-data';
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
      let queryPredicate = new Query.SimplePredicate('class', '==', classId);
      this.set('_queryPredicate', queryPredicate);
    }
  },

  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  objectListViewLimitPredicate() {
    let queryPredicate = this.get('_queryPredicate');
    // Demo data  TODO: Demo mode.
    if (Ember.isNone(queryPredicate)) {
      let demoStage = 'FB6972D1-F04A-4617-B454-D2D0DB4CEC05';
      let stagePk = this.get('currentProjectContext').getCurrentStage();
      let simplePredicates = Ember.A();
      if (stagePk.toLocaleLowerCase()  === demoStage.toLocaleLowerCase()) {
        simplePredicates.pushObject(new Query.SimplePredicate('class.id', Query.FilterOperator.Eq, '5b6bd5cd-66f2-4c38-85d1-9b0633df17b9'));
        simplePredicates.pushObject(new Query.SimplePredicate('class.id', Query.FilterOperator.Eq, '83daf0b0-a6df-4298-8980-1325b5c4ad09'));
        simplePredicates.pushObject(new Query.SimplePredicate('class.id', Query.FilterOperator.Eq, 'a58fcb63-69dd-4003-a7d1-17795568b3ce'));
        simplePredicates.pushObject(new Query.SimplePredicate('class.id', Query.FilterOperator.Eq, '91b136b8-ba32-43e7-aaf7-ac01c809d67c'));
        simplePredicates.pushObject(new Query.SimplePredicate('class.id', Query.FilterOperator.Eq, '1594c7c7-ea8f-46ea-a137-277258548945'));
        queryPredicate = new Query.ComplexPredicate(Query.Condition.Or, ...simplePredicates);
      }
    }

    return queryPredicate;
  },
});
