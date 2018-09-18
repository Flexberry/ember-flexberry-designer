import Ember from 'ember';
import EditFormController from 'ember-flexberry/controllers/edit-form';
import FdWorkPanelToggler from '../mixins/fd-work-panel-toggler';
import FdCreatingDiagramElementsControllerMixin from '../mixins/fd-creating-diagram-elements-controller';
import { Class } from '../objects/uml-primitives/fd-uml-class';
import { Association } from '../objects/uml-primitives/fd-uml-association';
import { findFreeNodeTreeNameIndex } from '../utils/fd-metods-for-tree';

export default EditFormController.extend(FdWorkPanelToggler, FdCreatingDiagramElementsControllerMixin, {
  parentRoute: 'fd-diagram-list-form',

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
  */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  actions: {
    addClass() {
      this.createObjectEvents((function(x, y) {
        let store = this.get('store');
        let stage = this.get('currentProjectContext').getCurrentStageModel();

        let allClasses = store.peekAll('fd-dev-class');
        let classesCurrentStage = allClasses.filterBy('stage.id', stage.get('id'));

        let index = findFreeNodeTreeNameIndex('NewClass', 1, classesCurrentStage, 'name');
        let freeName = 'NewClass' + index;

        let newClass = store.createRecord('fd-dev-class', {
          stage: stage,
          caption: freeName,
          description: freeName,
          name: freeName,
          nameStr: freeName,
        });

        let newClassObject = new Class({
          position: { x: x, y: y },
          size: { width: 100, height: 40 },
          name: freeName,
          attributes: '',
          methods: '',
          repositoryObject: newClass
        });

        return newClassObject;
      }).bind(this));
    },

    addAssociation() {
      this.createLinkEvents((function(linkProperties) {
        let store = this.get('store');
        let stage = this.get('currentProjectContext').getCurrentStageModel();

        let endClass = this.getRepObj(store, stage, linkProperties.endClassRepObj, 'fd-dev-class');
        let startClass = this.getRepObj(store, stage, linkProperties.startClassRepObj, 'fd-dev-class');

        let newAssociation = store.createRecord('fd-dev-association', {
          endClass: endClass,
          startClass: startClass,
          stage: stage,
          startMultiplicity: '1',
          endMultiplicity: '*'
        });

        let newAssociationObject = new Association({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points,
          repositoryObject: newAssociation
        });
        newAssociationObject.setLabelText('startMultiplicity', '1');
        newAssociationObject.setLabelText('endMultiplicity', '*');

        return newAssociationObject;
      }).bind(this), Ember.A(['flexberry.uml.Class']));
    }
  }
});
