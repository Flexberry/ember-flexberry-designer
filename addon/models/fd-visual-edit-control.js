import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';

/**
  Model to work with visual edit controller.

  @class NewPlatformFlexberryFlexberryDesignerVisualEditControl
  @extends Projection.Model
*/
let Model = Projection.Model.extend({
  prototypeBy: DS.attr('object'),
  name: DS.attr('string'),
  type: DS.attr('object'),
  isNull: DS.attr('boolean'),
  defaultValue: DS.attr('string')
});

export default Model;
