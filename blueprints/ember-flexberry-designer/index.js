/* globals module */
module.exports = {
  afterInstall: function() {
    var _this = this;
    return _this.addAddonsToProject({
      packages: [
        { name: 'ember-flexberry', target: '0.12.3' }
      ]
    }).then(function () {
      return _this.addPackagesToProject([
      { name: 'npm:jointjs', target: '^2.1.2' },
      ]);
    });
  },

  normalizeEntityName: function() {}
};
