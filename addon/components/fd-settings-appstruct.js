import Ember from 'ember';

export default Ember.Component.extend({

  selectedElement: undefined,

  actionTreeReceiver: undefined,

  selectedElementCaptionObserver: Ember.observer('selectedElement.caption', function() {
    let selectedElement = this.get('selectedElement');
    if (selectedElement.get('type') !== 'master' && selectedElement.get('type') !== 'desk') {
      let caption = selectedElement.get('caption');
      if (!Ember.isNone(caption)) {
        selectedElement.set('text', caption);
      } else {
        selectedElement.set('text', selectedElement.get('name'));
      }
    }
  }),

  selectedElementTextObserver: Ember.observer('selectedElement.text', function() {
    let selectedElement = this.get('selectedElement');
    this.get('actionTreeReceiver').send('renameNode', selectedElement.get('id'), selectedElement.get('text'));
  }),
});
