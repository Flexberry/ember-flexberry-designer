import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';
import { Component } from '../../objects/uml-primitives/fd-uml-component';
import { UmlNode } from '../../objects/uml-primitives/fd-uml-node';
import { DeploymentActiveObject } from '../../objects/uml-primitives/fd-uml-deployment-active-object';
import { Dependency } from '../../objects/uml-primitives/fd-uml-dependency';
import { Connection } from '../../objects/uml-primitives/fd-uml-connection';

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
    addComponent(e) {
      this.createObjectData((function(x, y) {
        let newComponentObject = new Component({
          position: { x: x, y: y },
          size: { width: 80, height: 40 },
          name: ''
        });

        return newComponentObject;
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
    addUmlNode(e) {
      this.createObjectData((function(x, y) {
        let newUmlNodeObject = new UmlNode({
          position: { x: x, y: y },
          size: { width: 80, height: 40 },
          name: ''
        });

        return newUmlNodeObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addDeploymentActiveObjects button.

      @method actions.addDeploymentActiveObject
      @param {jQuery.Event} e event.
     */
    addDeploymentActiveObject(e) {
      this.createObjectData((function(x, y) {
        let newDeploymentActiveObject = new DeploymentActiveObject({
          position: { x: x, y: y },
          size: { width: 80, height: 40 },
          name: ''
        });

        return newDeploymentActiveObject;
      }).bind(this), e);
    },

    /**
      Handler for click on addOnDpdDependency button.

      @method actions.addOnDpdDependency
      @param {jQuery.Event} e event.
     */
    addOnDpdDependency(e) {
      this.createLinkData((function(linkProperties) {
        let newDependencyObject = new Dependency({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newDependencyObject;
      }).bind(this), e, A(['flexberry.uml.Component', 'flexberry.uml.UmlNode']));
    },

    /**
      Handler for click on addConnection button.

      @method actions.addConnection
      @param {jQuery.Event} e event.
     */
    addConnection(e) {
      this.createLinkData((function(linkProperties) {
        let newConnectionObject = new Connection({
          source: {
            id: linkProperties.source
          },
          target: {
            id: linkProperties.target
          },
          vertices: linkProperties.points || A()
        });

        return newConnectionObject;
      }).bind(this), e, A(['flexberry.uml.Component', 'flexberry.uml.UmlNode', 'flexberry.uml.Instance', 'flexberry.uml.DeploymentActiveObject']));
    }
  }
});
