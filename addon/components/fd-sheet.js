import Ember from 'ember';
import layout from '../templates/components/fd-sheet';
import fdSheetMixin from '../mixins/fd-sheet-mixin';

export default Ember.Component.extend(fdSheetMixin, {
  layout,

  title: '',

  expand: false,

  actions: {
    closeSheet() {
      this.set('commonVisible.visible', '');
      this.set('expand', false);
      Ember.$('.pushable').removeClass('fade');
    },

    expand() {
      let contentWidth = this.expand ? '50%' : 'calc(100% - 300px)';
      Ember.$('.content-mini').css({ opacity: 0.2 });
      Ember.run.schedule('afterRender', this, () => {
        this.toggleProperty('expand');
      });

      Ember.run.later(function() {
        Ember.$('.content-mini').css({ opacity: '', width: contentWidth });
      }, 600);
    },

    save() {
    }
  }
});
