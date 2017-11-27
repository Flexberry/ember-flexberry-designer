/* globals module */
module.exports = {
  afterInstall: function() {
    var _this = this;
    return _this.addAddonsToProject({
      packages: [
        { name: 'ember-flexberry', target: '0.9.2-beta.7' }
      ]
    });
  },

  normalizeEntityName: function() {}
};
