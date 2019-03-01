import Ember from 'ember';
import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';

export default Ember.Route.extend(FdFormCheckTransitionMixin, {

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
   */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  /**
    A hook you can implement to convert the URL into the model for this route.
    [More info](http://emberjs.com/api/classes/Ember.Route.html#method_model).

    @method model
   */
  model: function() {
    let modelHash = {
      classes: Ember.A(),
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

      let classFormsArray = Ember.A(classForms);
      let editForms = classFormsArray.filterBy('stereotype', '«editform»');
      let listForms = classFormsArray.filterBy('stereotype', '«listform»');

      let inheritanceData = inheritanceCurrentStage.filterBy('child.id', implementation.get('id'));
      let parents = Ember.A(inheritanceData).mapBy('parent');

      modelHash.classes.pushObject({
        settings: implementation,
        editForms: Ember.A(editForms),
        listForms: Ember.A(listForms),
        parents: Ember.A(parents),
        bs: implementation.get('businessServerClass')
      });
    });

    // Typedef.
    let typedefs = classesCurrentStage.filterBy('stereotype', '«typedef»');
    modelHash.typedefs = Ember.A(typedefs);

    // Enums.
    let enums = classesCurrentStage.filterBy('stereotype', '«enumeration»');
    modelHash.enums = Ember.A(enums);

    // Types.
    let types = classesCurrentStage.filterBy('stereotype', '«type»');
    modelHash.types = Ember.A(types);

    // Applications.
    let applications = classesCurrentStage.filterBy('stereotype', '«application»');
    modelHash.applications = Ember.A(applications);

    // BS.
    let bs = classesCurrentStage.filterBy('stereotype', '«businessserver»');
    modelHash.bs = Ember.A(bs);

    // External.
    let externals = classesCurrentStage.filterBy('stereotype', '«external»');
    modelHash.externals = Ember.A(externals);

    // Extinterface.
    let extinterfaces = classesCurrentStage.filterBy('stereotype', '«externalinterface»');
    modelHash.extinterfaces = Ember.A(extinterfaces);

    // Interface.
    let interfaces = classesCurrentStage.filterBy('stereotype', '«interface»');
    modelHash.interfaces = Ember.A(interfaces);

    // Userforms.
    let userforms = classesCurrentStage.filterBy('stereotype', '«userform»');
    modelHash.userforms = Ember.A(userforms);

    // Userstereotypes.
    let designerStereotypes = Ember.A([
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
    modelHash.userstereotypes = Ember.A(userstereotypes);

    return modelHash;
  }
});
