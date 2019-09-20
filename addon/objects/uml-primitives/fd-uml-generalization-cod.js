/**
  @module ember-flexberry-designer
*/
import joint from 'npm:jointjs';

import FdUmlLink from './fd-uml-link';
import { Generalization } from './fd-uml-generalization';

/**
  An object that describes a link of the inheritance type on the UML diagram.

  @class FdUmlGeneralization
  @extends FdUmlLink
*/
export default FdUmlLink.extend({
  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'source', 'target', 'vertices', 'labels');
    properties.objectModel = this;
    return new GeneralizationCod(properties);
  },
});

/**
  Defines the JointJS link, which represents a generalization in the UML diagram.

  @for FdUmlGeneralization
  @class Generalization
  @extends Link
  @namespace flexberry.uml
  @constructor
*/
export let GeneralizationCod = Generalization.define('flexberry.uml.Generalization', {
}, {
  getLabelDistance: function (labelName) {
    switch (labelName) {
      case 'description':
        return 0.1;
    }
  }
});

joint.shapes.flexberry.uml.GeneralizationCodView = joint.shapes.flexberry.uml.GeneralizationView;
