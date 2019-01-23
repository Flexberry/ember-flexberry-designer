import Ember from 'ember';
import layout from '../templates/components/fd-sheet';
import fdSheetMixin from '../mixins/fd-sheet-mixin';

export default Ember.Component.extend(fdSheetMixin, {
  layout,

  title: '',

  expand: false,

  actions: {
    close() {
      this.set('commonVisible.visible', '');
      this.set('expand', false);
      Ember.$('.pushable').removeClass('fade');
    },

    expand() {
      this.toggleProperty('expand');
    },

    save() {
    }
  }
});
