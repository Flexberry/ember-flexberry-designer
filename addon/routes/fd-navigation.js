import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A, isArray } from '@ember/array';

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
    @default 'application-model-sheet'
  */
  sheetComponentName: 'navigation-sheet',

  model: function() {
    let modelHash = {
      classes: A(),
      applicationContainers: undefined
    };

    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    // Get current classes.
    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stage.get('id'));

    // null or «implementation»
    let implementations = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«implementation»' || item.get('stereotype') === null;
    });

    // «listform», «editform»
    let forms = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«listform»' || item.get('stereotype') === '«editform»';
    });

    // «application»
    let applications = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«application»';
    });

    if (applications.length === 0) {
      A(applications).pushObject(store.createRecord('fd-dev-class', {
        stage: stage,
        caption: 'Application',
        name: 'Application',
        nameStr: 'Application',
        stereotype: '«application»',
        containersStr: []
      }));
    }

    // Classes.
    implementations.forEach((implementation) => {
      let classForms = forms.filter((form) => {
        let idParent = form.get('formViews').mapBy('view.class.id');
        if (idParent[0] === implementation.id) {
          return form;
        }
      });

      let classFormsArray = A(classForms);
      let editForms = classFormsArray.filterBy('stereotype', '«editform»');
      let listForms = classFormsArray.filterBy('stereotype', '«listform»');

      if (editForms.length != 0 || listForms.length != 0) {
        modelHash.classes.pushObject({
          settings: implementation,
          editForms: A(editForms),
          listForms: A(listForms),
          parents: A(),
          bs: null
        });
      }
    });

    // Applications in tree data.
    let firstApp = A(applications).get('firstObject');
    if (!isArray(firstApp.get('containersStr'))) {
      firstApp.set('containersStr', []);
    }

    modelHash.applicationContainers = firstApp.get('containersStr');

    return modelHash;
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
