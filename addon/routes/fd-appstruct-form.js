import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { isNone, isBlank } from '@ember/utils';
import $ from 'jquery';
import FdAppStructTree from '../objects/fd-appstruct-tree';
import FdFormCheckTransitionMixin from '../mixins/fd-form-check-transition';

export default Route.extend(FdFormCheckTransitionMixin, {

  /**
   Service that get current project contexts.

   @property currentProjectContext
   @type {Class}
   @default service()
   */
  currentProjectContext: service('fd-current-project-context'),

  model: function() {
    let store = this.get('store');
    let stage = this.get('currentProjectContext').getCurrentStageModel();

    // Get current classes.
    let allClasses = store.peekAll('fd-dev-class');
    let classesCurrentStage = allClasses.filterBy('stage.id', stage.get('id'));

    // null or «implementation»
    let implementations = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«implementation»' || isBlank(item.get('stereotype'));
    });

    // «listform», «editform»
    let forms = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«listform»' || item.get('stereotype') === '«editform»';
    });

    // «application»
    let applications = classesCurrentStage.filter(function(item) {
      return item.get('stereotype') === '«application»';
    });

    if (applications.length === 0) {
      A(applications).pushObject(store.createRecord('fd-dev-class', {
        stage: stage,
        caption: 'Application',
        name: 'Application',
        nameStr: 'Application',
        stereotype: '«application»',
        containersStr: A()
      }));
    }

    /*
      Build tree.
    */

    // Form in tree data.
    let treeNodeForms = A();
    forms.forEach((form, index) => {
      let idParent = form.get('formViews').mapBy('view.class.id');
      treeNodeForms.pushObject(
        FdAppStructTree.create({
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
    let treeLeft = A();
    implementations.forEach((implementation, index) => {
      let implementationsChildren = treeNodeForms.filterBy('idParent', implementation.id);
      let typeImplementation = implementation.get('stored') ? 'implementations' : 'notStored';
      treeLeft.pushObject(
        FdAppStructTree.create({
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
    let rightTreeNodes = A();
    applications.forEach((application) => {
      rightTreeNodes.pushObjects(application.get('containersStr'));
    });

    // Update stereotype.
    this._updateTypeRightTree(rightTreeNodes, classesCurrentStage);

    // Add root tree.
    let treeRight = A([
      FdAppStructTree.create({
        text: this.get('i18n').t('forms.fd-appstruct-form.desktop').toString(),
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
    let context = this.get('currentProjectContext');
    controller.set('parentRoute', this.get('router.url'));
    controller.set('searchTermLeft', '');
    controller.set('searchTermRight', '');
    controller.set('singleModeStage', context.singleStageMode);

    let stagePk = context.getCurrentStage();
    let adapter = getOwner(this).lookup('adapter:application');

    adapter.callFunction('GetCurrentProcessMethodology', { project: stagePk.toString() }, null, { withCredentials: true },
    (result) => {
      controller.set('processMethodologyValue', result.value);
    });
    controller.originalDataInit();
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
        if (node.className !== '' && !isNone(node.className)) {
          let classData = recordsDevClass.findBy('name', node.className);
          node.set('type', classData.get('stereotype'));
          node.set('a_attr', { title: classData.get('stereotype') + ' ' + classData.get('name') });
        } else {
          node.set('type', 'url');
          node.set('a_attr', { title: 'url' });
        }
      }
    });
  },

  actions: {
    didTransition() {
      $('#example .flexberry-content').css('padding-bottom', 0);
      $('.flexberry-content > .ui.main.container').css('margin-bottom', 0);
    }
  }
});
