import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

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
  fdSheetService: Ember.inject.service(),

  /**
    Sheet component name.

    @property sheetComponentName
    @type String
    @default 'application-model-sheet'
  */
  sheetComponentName: 'application-model-sheet',

  /**
    Sheet view name.

    @property sheetViewName
    @type String
    @default 'view-sheet'
  */
  sheetViewName: 'view-sheet',

  /**
    A hook you can implement to convert the URL into the model for this route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_model).

    @method model
   */
  model: function() {
    let modelHash = {
      classes: A(),
      typedefs: undefined,
      enums: undefined,
      types: undefined,
      applications: undefined,
      bs: undefined,
      externals: undefined,
      extinterfaces: undefined,
      interfaces: undefined,
      userforms: undefined,
      userstereotypes: undefined
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

    // Get current inheritance.
    let recordsInheritance = store.peekAll('fd-dev-inheritance');
    let inheritanceCurrentStage = recordsInheritance.filterBy('stage.id', stage.get('id'));

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

      let inheritanceData = inheritanceCurrentStage.filterBy('child.id', implementation.get('id'));
      let parents = A(inheritanceData).mapBy('parent');

      modelHash.classes.pushObject({
        settings: implementation,
        editForms: A(editForms),
        listForms: A(listForms),
        parents: A(parents),
        bs: implementation.get('businessServerClass')
      });
    });

    // Typedef.
    let typedefs = classesCurrentStage.filterBy('stereotype', '«typedef»');
    modelHash.typedefs = A(typedefs);

    // Enums.
    let enums = classesCurrentStage.filterBy('stereotype', '«enumeration»');
    modelHash.enums = A(enums);

    // Types.
    let types = classesCurrentStage.filterBy('stereotype', '«type»');
    modelHash.types = A(types);

    // Applications.
    let applications = classesCurrentStage.filterBy('stereotype', '«application»');
    modelHash.applications = A(applications);

    // BS.
    let bs = classesCurrentStage.filterBy('stereotype', '«businessserver»');
    modelHash.bs = A(bs);

    // External.
    let externals = classesCurrentStage.filterBy('stereotype', '«external»');
    modelHash.externals = A(externals);

    // Extinterface.
    let extinterfaces = classesCurrentStage.filterBy('stereotype', '«externalinterface»');
    modelHash.extinterfaces = A(extinterfaces);

    // Interface.
    let interfaces = classesCurrentStage.filterBy('stereotype', '«interface»');
    modelHash.interfaces = A(interfaces);

    // Userforms.
    let userforms = classesCurrentStage.filterBy('stereotype', '«userform»');
    modelHash.userforms = A(userforms);

    // Userstereotypes.
    let designerStereotypes = A([
      null,
      '«implementation»',
      '«listform»',
      '«editform»',
      '«typedef»',
      '«enumeration»',
      '«type»',
      '«application»',
      '«businessserver»',
      '«external»',
      '«externalinterface»',
      '«interface»',
      '«userform»'
    ]);
    let userstereotypes = classesCurrentStage.filter(function(item) {
      return !designerStereotypes.includes(item.get('stereotype'));
    });
    modelHash.userstereotypes = A(userstereotypes);

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
    controller.set('sheetViewName', this.get('sheetViewName'));
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
      this.get('fdSheetService').closeSheet(this.get('sheetViewName'));

      this._super(...arguments);
    }
  }
});
