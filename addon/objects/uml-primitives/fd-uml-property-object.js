/**
  @module ember-flexberry-designer
*/

import { computed } from '@ember/object';
import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';

import { BaseClass } from './fd-uml-class';
import joint from 'npm:jointjs';
import FdUmlElement from './fd-uml-element';

/**
  An object that describes a PropertyObject on the UML diagram.

  @class FdUmlPropertyObject
  @extends FdUmlElement
*/
export default FdUmlElement.extend({

  /**
    The name of the PropertyObject.

    @property name
    @type String
  */
  name: computed('primitive.Name.Text', {
    get() {
      return this.get('primitive.Name.Text');
    },
    set(key, value) {
      let nameTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Name.Text', nameTxt);
      return value;
    },
  }),

  /**
    List of PropertyObject's attributes.

    @property attributes
    @type Array
  */
  attributes: computed('primitive.AttributesTxt.Text', {
    get() {
      if (!isEmpty(this.get('primitive.Prop.Text'))) {
        return this.get('primitive.Prop.Text').split('\n');
      }

      return [];
    },
    set(key, value) {
      let attributesTxt = (isArray(value)) ? value.join('\n') : value;
      this.set('primitive.Prop.Text', attributesTxt);
      return value;
    },
  }),

  /**
    See {{#crossLink "FdUmlPrimitive/JointJS:method"}}here{{/crossLink}}.

    @method JointJS
  */
  JointJS() {
    let properties = this.getProperties('id', 'size', 'position');
    properties.objectModel = this;
    return new PropertyObject(properties);

  },
});

/**
  Defines the JointJS object, which represents a PropertyObject on the UML diagram.

  @for FdUmlPropertyObject
  @class PropertyObject
  @extends BaseClass
  @namespace flexberry.uml
  @constructor
*/
export let PropertyObject = BaseClass.define('flexberry.uml.PropertyObject', {
  attrs: {
    '.flexberry-uml-header-text': {
      'text-decoration': 'underline'
    },
  },
}, {
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<rect class="flexberry-uml-header-rect"/><rect class="flexberry-uml-body-rect"/>',
      '</g>',
      '</g>'
    ].join('')
  });

joint.shapes.flexberry.uml.PropertyObjectView = joint.shapes.flexberry.uml.BaseObjectView.extend();
