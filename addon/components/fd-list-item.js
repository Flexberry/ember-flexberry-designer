import Ember from 'ember';
import layout from '../templates/components/fd-list-item';
import fdSheetMixin from '../mixins/fd-sheet-mixin';

export default Ember.Component.extend(fdSheetMixin, {
  layout,
  caption: '',
  fdListItemActive: undefined,

  actions: {
    openSheet() {
      this.deactivateListItem();
      this._super(...arguments);
      this.set('fdListItemActive', 'active');
    }
  }
});
