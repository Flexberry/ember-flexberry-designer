import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isNone } from '@ember/utils';
import { deserialize } from '../utils/transforms-utils/fd-containers-tree';

export default Route.extend({
  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),
  /**
    Service for managing the state of the sheet component.

    @property fdSheetService
    @type FdSheetService
  */
  fdSheetService: service(),

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default 'navigation-sheet'
  */
  sheetComponentName: 'navigation-sheet',

  model() {
    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    // Get current classes.
    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stage.get('id'));

    // «listform»
    let forms = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«listform»';
    });

    // «application»
    let application = classesCurrentStage.find(function(item) {
      return item.get('stereotype') === '«application»';
    });

    if (isNone(application)) {
      application = store.createRecord('fd-dev-class', {
        stage: stage,
        caption: 'Application',
        name: 'Application',
        nameStr: 'Application',
        stereotype: '«application»',
        containersStr: ''
      });
    }

    return {
      tree: deserialize(application.get('containersStr')),
      forms: forms,
      app: application
    };
  },

  /**
    A hook you can use to setup the controller for the current route.
    [More info](https://www.emberjs.com/api/ember/release/classes/Route/methods/setupController?anchor=setupController).

    @method setupController
    @param {<a href="https://emberjs.com/api/ember/release/classes/Controller">Controller</a>} controller
  */
  setupController(controller) {
    this._super(...arguments);

    controller.set('sheetComponentName', this.get('sheetComponentName'));
  },

  actions: {
    /**
      It sends message about transition to corresponding controller.

      The willTransition action is fired at the beginning of any attempted transition with a Transition object as the sole argument.
      [More info](http://emberjs.com/api/classes/Ember.Route.html#event_willTransition).

      @method actions.willTransition
    */
    willTransition() {
      this.get('fdSheetService').closeSheet(this.get('sheetComponentName'));

      this._super(...arguments);
    }
  }
});
