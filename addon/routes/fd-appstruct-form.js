import Ember from 'ember';
import FdViewAttributesTree from '../objects/fd-view-attributes-tree';
export default Ember.Route.extend({

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default Ember.inject.service()
   */
  currentProjectContext: Ember.inject.service('fd-current-project-context'),

  model: function() {
    let store = this.get('store');
    let stagePk = this.get('currentProjectContext').getCurrentStage();

    // Get current classes.
    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stagePk);

    // null or «implementation»
    let implementations = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«implementation»' || item.get('stereotype') === null;
    });

    // «listform», «editform»
    let forms = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«listform»' || item.get('stereotype') === '«editform»';
    });

    // «application»
    let applications = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«application»';
    });

    /*
      Build tree.
    */

    // Form in tree data.
    let treeNodeForms = Ember.A();
    forms.forEach((form, index) => {
      let idParent = form.get('formViews').mapBy('view.class.id');
      treeNodeForms.pushObject(
        FdViewAttributesTree.create({
          text: form.get('caption') || form.get('name'),
          name: form.get('name'),
          caption: form.get('caption'),
          description: form.get('description'),
          type: form.get('stereotype'),
          id: 'node_form_' + index,
          idNode: form.get('id'),
          idParent: idParent[0],
          a_attr: {
            title: form.get('stereotype') + ' ' + form.get('name')
          }
        }));
    });

    // Implementations in tree data.
    let treeLeft = Ember.A();
    implementations.forEach((implementation, index) => {
      let implementationsChildren = treeNodeForms.filterBy('idParent', implementation.id);
      let typeImplementation = implementation.get('stored') ? 'implementations' : 'notStored';
      treeLeft.pushObject(
        FdViewAttributesTree.create({
          text: implementation.get('caption') || implementation.get('name'),
          name: implementation.get('name'),
          type: typeImplementation,
          id: 'node_impl_' + index,
          idNode: implementation.get('id'),
          children: implementationsChildren,
          copyChildren: implementationsChildren,
          a_attr: {
            title: implementation.get('name')
          }
        }));
    });

    // applications in tree data.
    let rightTreeNodes = Ember.A();
    applications.forEach((application) => {
      rightTreeNodes.pushObjects(application.get('containersStr'));
    });

    // Update stereotype.
    this._updateTypeRightTree(rightTreeNodes, classesCurrentStage);

    // Add root tree.
    let treeRight = Ember.A([
      FdViewAttributesTree.create({
        text: 'Рабочий стол',
        type: 'desk',
        id: 'node_app',
        children: rightTreeNodes,
        copyChildren: rightTreeNodes,
        state: {
          opened: true
        }
      })
    ]);

    return {
      leftTreeNodes: treeLeft,
      rightTreeNodes: treeRight,
      applications: applications
    };
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('parentRoute', this.get('router.url'));
  },

  /**
    Method for update type right tree.
    @method _updateTypeRightTree
  */
  _updateTypeRightTree(rightTreeNodes, recordsDevClass) {
    let _this = this;
    rightTreeNodes.forEach(function(node) {
      // TODO: Explore ember-cli-jstree
      if (!node.get('children') && node.get('copyChildren')) {
        node.set('children', node.get('copyChildren'));
      }

      if (node.type === 'folder') {
        _this._updateTypeRightTree(node.get('children'), recordsDevClass);
        node.set('copyChildren', node.get('children'));
      } else {
        if (node.className !== '') {
          let classData = recordsDevClass.findBy('name', node.className);
          node.set('type', classData.get('stereotype'));
          node.set('a_attr', { title: classData.get('stereotype') + ' ' + classData.get('name') });
        } else {
          node.set('type', 'FreeForm');
          node.set('a_attr', { title: 'FreeForm' });
        }
      }
    });
  },

  actions:{
    didTransition() {
      Ember.$('#example .flexberry-content').css('padding-bottom', 0);
      Ember.$('.flexberry-content > .ui.main.container').css('margin-bottom', 0);
    }
  }
});
