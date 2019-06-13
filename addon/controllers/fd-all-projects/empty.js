/**
  @module ember-flexberry-designer
*/

import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        newProject() {
            this.transitionToRoute('fd-all-projects.new');
        }
    }
});