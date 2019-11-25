import Route from '@ember/routing/route';
import FdShareLoadData from '../mixins/fd-share-load-data';
import FdWrapperModel from '../mixins/fd-wrapper-model';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { isBlank } from '@ember/utils';

export default Route.extend(FdWrapperModel, FdShareLoadData, {

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
  sheetComponentName: 'class-sheet',

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
      geolayers: undefined,
      geolayerstyles: undefined,
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
    let implementationsSort = A(implementations).sortBy('name');
    implementationsSort.forEach((implementation) => {
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
    let typedefsSort = A(typedefs).sortBy('name');
    let wrapTypedefs = this.wrapModel(typedefsSort);
    modelHash.typedefs = A(wrapTypedefs);

    // Enums.
    let enums = classesCurrentStage.filterBy('stereotype', '«enumeration»');
    let enumsSort = A(enums).sortBy('name');
    let wrapEnums = this.wrapModel(enumsSort);
    modelHash.enums = A(wrapEnums);

    // Types.
    let types = classesCurrentStage.filterBy('stereotype', '«type»');
    let typesSort = A(types).sortBy('name');
    let wrapTypes = this.wrapModel(typesSort);
    modelHash.types = A(wrapTypes);

    // Applications.
    let applications = classesCurrentStage.filterBy('stereotype', '«application»');
    let applicationsSort = A(applications).sortBy('name');
    let wrapApplications = this.wrapModel(applicationsSort);
    modelHash.applications = A(wrapApplications);

    // BS.
    let bs = classesCurrentStage.filterBy('stereotype', '«businessserver»');
    let bsSort = A(bs).sortBy('name');
    let wrapBs = this.wrapModel(bsSort);
    modelHash.bs = A(wrapBs);

    // External.
    let externals = classesCurrentStage.filterBy('stereotype', '«external»');
    let externalsSort = A(externals).sortBy('name');
    let wrapExternals = this.wrapModel(externalsSort);
    modelHash.externals = A(wrapExternals);

    // Extinterface.
    let extinterfaces = classesCurrentStage.filterBy('stereotype', '«externalinterface»');
    let extinterfacesSort = A(extinterfaces).sortBy('name');
    let wrapExtinterfaces = this.wrapModel(extinterfacesSort);
    modelHash.extinterfaces = A(wrapExtinterfaces);

    // Interface.
    let interfaces = classesCurrentStage.filterBy('stereotype', '«interface»');
    let interfacesSort = A(interfaces).sortBy('name');
    let wrapInterfaces = this.wrapModel(interfacesSort);
    modelHash.interfaces = A(wrapInterfaces);

    // Userforms.
    let userforms = classesCurrentStage.filterBy('stereotype', '«userform»');
    let userformsSort = A(userforms).sortBy('name');
    let wrapUserforms = this.wrapModel(userformsSort);
    modelHash.userforms = A(wrapUserforms);

    // Geolayers.
    let geolayers = classesCurrentStage.filterBy('stereotype', '«geolayer»');
    let geolayersSort = A(geolayers).sortBy('name');
    let wrapGeolayers = this.wrapModel(geolayersSort);
    modelHash.geolayers = A(wrapGeolayers);

    // Geolayerstyles.
    let geolayerstyles = classesCurrentStage.filterBy('stereotype', '«geolayerstyle»');
    let geolayerstylesSort = A(geolayerstyles).sortBy('name');
    let wrapGeolayerstyles = this.wrapModel(geolayerstylesSort);
    modelHash.geolayerstyles = A(wrapGeolayerstyles);

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
      '«userform»',
      '«geolayer»',
      '«geolayerstyle»'
    ]);
    let userstereotypes = classesCurrentStage.filter(function(item) {
      return !designerStereotypes.includes(item.get('stereotype')) && !isBlank(item.get('stereotype'));
    });
    let userstereotypesSort = A(userstereotypes).sortBy('name');
    let wrapUserstereotypes = this.wrapModel(userstereotypesSort);
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
  },

  actions: {
    /**
      It sends message about transition to corresponding controller.

      The willTransition action is fired at the beginning of any attempted transition with a Transition object as the sole argument.
      [More info](http://emberjs.com/api/classes/Ember.Route.html#event_willTransition).

      @method actions.willTransition
    */
    willTransition(transition) {
      this.get('fdSheetService').transitionFromSheet(transition, this.get('sheetComponentName'));

      this._super(...arguments);
    }
  }
});
