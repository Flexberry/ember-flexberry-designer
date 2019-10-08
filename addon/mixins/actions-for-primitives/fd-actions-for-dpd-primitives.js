import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';

import Component from '../../objects/uml-primitives/fd-uml-component';
import UmlNode from '../../objects/uml-primitives/fd-uml-node';
import DeploymentActiveObject from '../../objects/uml-primitives/fd-uml-deployment-active-object';
import Dependency from '../../objects/uml-primitives/fd-uml-dependency';
import Connection from '../../objects/uml-primitives/fd-uml-connection';

import { getJsonForElement, getJsonForLink } from '../../utils/get-json-for-diagram';
/**
  Actions for creating joint js elements on dpd diagrams.

  @class FdAcrionsForDpdPrimitivesMixin
  @extends <a href="http://emberjs.com/api/classes/Ember.Mixin.html">Ember.Mixin</a>
*/
export default Mixin.create({
  actions: {
    /**
      Handler for click on addComponent button.

      @method actions.addComponent
      @param {jQuery.Event} e event.
     */
    adddOnDpdComponent(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.dpd.Component, UMLDPD',
          { x, y },
          { width: 80, height: 40 },
          { Name: '' }
        );
        let dpdObject = Component.create({ primitive: jsonObject });
        this._addToPrimitives(dpdObject);
        return dpdObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addInterface button.

      @method actions.addInterface
      @param {jQuery.Event} e event.
     */
    addInterface() {
      // TODO Add action when fix primitive 'Interface' TFS 169736
    },

    /**
      Handler for click on addUmlNode button.

      @method actions.addUmlNode
      @param {jQuery.Event} e event.
     */
    addOnDpdUmlNode(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.dpd.Node, UMLDPD',
          { x, y },
          { width: 80, height: 40 },
          { Name: '' }
        );
        let newUmlNodeObject = UmlNode.create({ primitive: jsonObject });
        this._addToPrimitives(newUmlNodeObject);
        return newUmlNodeObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addDeploymentActiveObjects button.

      @method actions.addDeploymentActiveObject
      @param {jQuery.Event} e event.
     */
    addDeploymentActiveObject(e) {
      this.createObjectData((function(x, y) {
        let jsonObject = getJsonForElement(
          'STORMCASE.UML.dpd.Node, UMLDPD',
          { x, y },
          { width: 80, height: 40 },
          { Name: '' }
        );
        let newDeploymentActiveObject = DeploymentActiveObject.create({ primitive: jsonObject });
        this._addToPrimitives(newDeploymentActiveObject);
        return newDeploymentActiveObject.JointJS();
      }).bind(this), e);
    },

    /**
      Handler for click on addOnDpdDependency button.

      @method actions.addOnDpdDependency
      @param {jQuery.Event} e event.
     */
    addOnDpdDependency(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.dpd.Dependency, UMLDPD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '' },
          { NamePos: 0.0 }
        );

        let nestedOnDpdDependencObject = Dependency.create({ primitive: jsonObject });
        nestedOnDpdDependencObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(nestedOnDpdDependencObject);

        return nestedOnDpdDependencObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Component', 'flexberry.uml.UmlNode']));
    },

    /**
      Handler for click on addConnection button.

      @method actions.addConnection
      @param {jQuery.Event} e event.
     */
    addOnDpdConnection(e) {
      this.createLinkData((function(linkProperties) {
        let jsonObject = getJsonForLink(
          'STORMCASE.UML.dpd.Connection, UMLDPD',
          linkProperties.source,
          null,
          linkProperties.target,
          null,
          A(),
          { Name: '' },
          { NamePos: 0.0 }
        );

        let nestedOnDpdConnectionObject = Connection.create({ primitive: jsonObject });
        nestedOnDpdConnectionObject.set('vertices', linkProperties.points || A());

        this._addToPrimitives(nestedOnDpdConnectionObject);

        return nestedOnDpdConnectionObject.JointJS();
      }).bind(this), e, A(['flexberry.uml.Component', 'flexberry.uml.UmlNode', 'flexberry.uml.Instance', 'flexberry.uml.DeploymentActiveObject']));
    }
  }
});
