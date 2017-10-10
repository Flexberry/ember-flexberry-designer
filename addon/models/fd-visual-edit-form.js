import DS from 'ember-data';
import { Projection } from 'ember-flexberry-data';

/**
  Model to work with visual edit form.

  @class NewPlatformFlexberryFlexberryDesignerVisualEditForm
  @extends Projection.Model
*/
let Model = Projection.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  components: DS.hasMany('fd-visual-edit-control')
});

export default Model;
