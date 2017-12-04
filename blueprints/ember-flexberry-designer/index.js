/* globals module */
module.exports = {
  afterInstall: function() {
    var _this = this;
    return _this.addAddonsToProject({
      packages: [
        { name: 'ember-flexberry', target: '0.9.2-beta.7' },
        { name: 'ember-browserify', target: '1.1.9' }
      ]
    }).then(function () {
      return _this.addPackagesToProject([
      { name: 'npm:jointjs', target: '2.0.1' },
      ]);
    });
  },

  normalizeEntityName: function() {}
};
