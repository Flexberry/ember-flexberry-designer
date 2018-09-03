/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import FdUmlPrimitive from './fd-uml-primitive';

/**
  An object that defines any link on the UML diagram.

  @class FdUmlBaseLink
  @extends FdUmlPrimitive
*/
export default FdUmlPrimitive.extend({

  /**
    An object with an `id` of another UML primitive, which is the source, for example `{ id: '1' }`.

    @property source
    @type Object
  */
  source: Ember.computed('primitive.EndPrimitive.$ref', function() {
    return { id: this.get('primitive.EndPrimitive.$ref') };
  }),

  /**
    An object with an `id` of another UML primitive, which is the target, for example `{ id: '1' }`.

    @property target
    @type Object
  */
  target: Ember.computed('primitive.StartPrimitive.$ref', function() {
    return { id: this.get('primitive.StartPrimitive.$ref') };
  }),

  /**
  The start multiplicity of a link.

  @property startMultiplicity
  @type String
  */
  startMultiplicity: Ember.computed.alias('primitive.StartMultTxt.Text'),

  /**
    The end multiplicity of a link.

    @property endMultiplicity
    @type String
  */
  endMultiplicity: Ember.computed.alias('primitive.EndMultTxt.Text'),

  /**
    End role text.

    @property endRoleTxt
    @type String
  */
  endRoleTxt: Ember.computed.alias('primitive.EndRoleTxt.Text'),

  /**
    Start role text.

    @property startRoleTxt
    @type String
  */
  startRoleTxt: Ember.computed.alias('primitive.StartRoleTxt.Text'),

  /**
    Link description.

    @property description
    @type String
  */
  description: Ember.computed.alias('primitive.Name.Text'),

  /**
    An array containing all the labels.

    @property labels
    @type Array
  */
  labels: Ember.computed('startMultiplicity', 'endMultiplicity', 'startRoleTxt', 'endRoleTxt', function () {
    return [
      { attrs: { text: { text: this.get('endMultiplicity') } } },
      { attrs: { text: { text: this.get('startMultiplicity') } } },
      { attrs: { text: { text: this.get('description') } } },
      { attrs: { text: { text: this.get('endRoleTxt') } } },
      { attrs: { text: { text: this.get('startRoleTxt') } } },
    ];
  }),

  /**
    The vertices through which this link passes. An array of objects with `X` and `Y` coordinates, for example `[{ x: 100, y: 100 }]`.

    @property vertices
    @type Array
  */
  vertices: Ember.computed('primitive.Points', function() {
    let vertices = [];
    let points = this.get('primitive.Points');
    for (let i = points.length - 2; i > 0; i--) {
      vertices.push({ x: points[i].X, y: points[i].Y });
    }

    return vertices;
  })
});
