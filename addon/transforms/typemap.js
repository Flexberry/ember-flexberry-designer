import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    let ret = Ember.A();
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(serialized, 'text/xml');

    if (xmlDoc) {
      let items = xmlDoc.getElementsByTagName('TypeMap');
      if (items.length > 0) {
        let arr = items[0].getElementsByTagName('*');
        for (let item of arr) {
          ret.push(item.tagName);
        }
      }
    }

    return ret;
  },

  serialize(deserialized, options) {
    return Ember.isEmpty(deserialized) ? null : Number(deserialized);
  }

});
