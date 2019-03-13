import Ember from 'ember';

export default Ember.Helper.extend({
  compute([name]) {
    let component = Ember.getOwner(this).lookup(`component:${name}`);
    if (Ember.isNone(component)) {
      return false;
    }

    return true;
  }
});
