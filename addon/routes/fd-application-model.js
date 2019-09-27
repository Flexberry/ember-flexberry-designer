import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A, isArray } from '@ember/array';
import { isNone, isBlank } from '@ember/utils';

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
      return item.get('stereotype') === '«implementation»' || isBlank(item.get('stereotype'));
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
      let wrapEditForms = this.wrapModel(editForms);
      let wrapListForms = this.wrapModel(listForms);

      let inheritanceData = inheritanceCurrentStage.filterBy('child.id', implementation.get('id'));
      let parents = A(inheritanceData).mapBy('parent');
      let wrapParents = this.wrapModel(parents);

      modelHash.classes.pushObject({
        settings: this.wrapModel(implementation),
        editForms: A(wrapEditForms),
        listForms: A(wrapListForms),
        parents: A(wrapParents),
        bs: this.wrapModel(implementation.get('businessServerClass'))
      });
    });

    // Typedef.
    let typedefs = classesCurrentStage.filterBy('stereotype', '«typedef»');
    let wrapTypedefs = this.wrapModel(typedefs);
    modelHash.typedefs = A(wrapTypedefs);

    // Enums.
    let enums = classesCurrentStage.filterBy('stereotype', '«enumeration»');
    let wrapEnums = this.wrapModel(enums);
    modelHash.enums = A(wrapEnums);

    // Types.
    let types = classesCurrentStage.filterBy('stereotype', '«type»');
    let wrapTypes = this.wrapModel(types);
    modelHash.types = A(wrapTypes);

    // Applications.
    let applications = classesCurrentStage.filterBy('stereotype', '«application»');
    let wrapApplications = this.wrapModel(applications);
    modelHash.applications = A(wrapApplications);

    // BS.
    let bs = classesCurrentStage.filterBy('stereotype', '«businessserver»');
    let wrapBs = this.wrapModel(bs);
    modelHash.bs = A(wrapBs);

    // External.
    let externals = classesCurrentStage.filterBy('stereotype', '«external»');
    let wrapExternals = this.wrapModel(externals);
    modelHash.externals = A(wrapExternals);

    // Extinterface.
    let extinterfaces = classesCurrentStage.filterBy('stereotype', '«externalinterface»');
    let wrapExtinterfaces = this.wrapModel(extinterfaces);
    modelHash.extinterfaces = A(wrapExtinterfaces);

    // Interface.
    let interfaces = classesCurrentStage.filterBy('stereotype', '«interface»');
    let wrapInterfaces = this.wrapModel(interfaces);
    modelHash.interfaces = A(wrapInterfaces);

    // Userforms.
    let userforms = classesCurrentStage.filterBy('stereotype', '«userform»');
    let wrapUserforms = this.wrapModel(userforms);
    modelHash.userforms = A(wrapUserforms);

    // Userstereotypes.
    let designerStereotypes = A([
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
      return !designerStereotypes.includes(item.get('stereotype')) && !isBlank(item.get('stereotype'));
    });
    let wrapUserstereotypes = this.wrapModel(userstereotypes);
    modelHash.userstereotypes = A(wrapUserstereotypes);

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

    controller.set('isAddMode', false);
    controller.set('sheetComponentName', this.get('sheetComponentName'));
    controller.set('sheetViewName', this.get('sheetViewName'));
  },

  /**
    Wrap model data.

    @method wrapModel
    @param {Object} model
  */
  wrapModel(model) {
    if (isNone(model)) {
      return null;
    }

    if (isArray(model)) {
      return A(model).map((element) => ({ data: element, active: false }));
    } else {
      return { data: model, active: false };
    }
  },

  actions: {
    /**
      It sends message about transition to corresponding controller.

      The willTransition action is fired at the beginning of any attempted transition with a Transition object as the sole argument.
      [More info](http://emberjs.com/api/classes/Ember.Route.html#event_willTransition).

      @method actions.willTransition
    */
    willTransition(transition) {
      this.get('fdSheetService').transitionFromSheet(transition, this.get('sheetComponentName'), this.get('sheetViewName'));

      this._super(...arguments);
    }
  }
});
