import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';

/**
  Model to work with visual edit controller.

  @class NewPlatformFlexberryFlexberryDesignerVisualEditControl
  @extends Projection.Model
*/
let Model = Projection.Model.extend({
  isSelected: DS.attr('boolean'),
  prototypeBy: DS.attr('string'),
  name: DS.attr('string'),
  value: DS.attr('string'),
  type: DS.attr('string'),
  inputType: DS.attr('string'),
  controlType: DS.attr('string'),
  isNull: DS.attr('boolean'),
  defaultValue: DS.attr('string')
});

export default Model;
