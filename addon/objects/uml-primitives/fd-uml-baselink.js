/**
  @module ember-flexberry-designer
*/

import Ember from 'ember';
import FdUmlPrimitive from './fd-uml-primitive';

/**
  An object that defines any link on the UML diagram.

  @class FdUmlLink
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
    Stored text.

    @property target
    @type Object
  */
  description: Ember.computed.alias('primitive.Name.Text'),

  labels: Ember.computed('startMultiplicity', 'endMultiplicity', function () {
    return [
      { attrs: { text: { text: this.get('endMultiplicity') } } },
      { attrs: { text: { text: this.get('startMultiplicity') } } },
      { attrs: { text: { text: this.get('description') } } },
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
