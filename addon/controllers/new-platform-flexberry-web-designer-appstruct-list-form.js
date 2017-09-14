import Ember from 'ember';
import FlexberryTreenodeActionsHandlerMixin from 'ember-flexberry/mixins/flexberry-treenode-actions-handler';
import TreeNodeObject from 'ember-flexberry/objects/tree-node';

export default Ember.Controller.extend(FlexberryTreenodeActionsHandlerMixin, {

  leftClickedElement: null,
  leftClickedPath: null,

  jsonLeftTreeCollapsible: true,
  jsonLeftTreeClass: 'styled',

  model: {
    jsonLeftTreeNodes : [
      { caption: 'Файл' },
      { caption: 'Документация по конкурсу' },
      { caption: 'Критерий оценки' },
      { caption: 'Конкурсы', nodes: [{ caption: 'Конкурс1'}, { caption: 'Конкурс2' }]},
      { caption: 'Пользователь' },
      { caption: 'Идеи', nodes: [{ caption: 'Идея11'},{ caption: 'Идея12'}]},
    ],

    jsonRightTreeNodes: [
      {
        caption: 'Рабочий стол',
        nodes: [
          { caption: 'Пользователь1' },
          { caption: 'Пользователь2' },
          { caption: 'Конкурсы', nodes: [{ caption: 'Конкурс1'},{ caption: 'Конкурс2'}]}
        ],
      }
    ],
  },

  jsonLeftTreeNodes: Ember.A([
      TreeNodeObject.create({
        caption: 'Файл',
        nodes: null
      }),
      TreeNodeObject.create({
        caption: 'Документация по конкурсу',
        nodes: null
      }),
      TreeNodeObject.create({
        caption: 'Критерий оценки',
        nodes: null
      }),
      TreeNodeObject.create({
        caption: 'Конкурсы',
        nodes: Ember.A([
          TreeNodeObject.create({
            caption: 'Конкурс1',
            nodes: null
          }),
          TreeNodeObject.create({
            caption: 'Конкурс2',
            nodes: null
          })
        ])
      }),
      TreeNodeObject.create({
        caption: 'Пользователь',
        nodes: null
      }),
      TreeNodeObject.create({
        caption: 'Идеи',
        nodes: Ember.A([
          TreeNodeObject.create({
            caption: 'Идея1',
            nodes: null
          }),
          TreeNodeObject.create({
            caption: 'Идея2',
            nodes: null
          })
        ])
      }),

    ]),

  rightClickedElement: null,
  rightClickedPath: null,

  jsonRightTreeCollapsible: true,
  jsonRightTreeClass: 'styled',

  jsonRightTree: {
    caption: 'Folder',
  },

  jsonRightTreeNodes: Ember.computed('i18n.locale', 'model.jsonRightTreeNodes', function() {
    let treeNodes = this._jsTreeToFlexberryTree(this.model.jsonRightTreeNodes);
    return treeNodes;
  }),

  _jsTreeToFlexberryTree: function (jsTree) {
    if (!jsTree) return null;
    let ret = Ember.A([]);
    for (let i=0; i < jsTree.length; i++) {
      let node = jsTree[i];
      let caption = node.caption;
      let nodes = node.nodes;
      if (nodes && nodes.length > 0) {
        nodes = this._jsTreeToFlexberryTree(nodes);
      }
      let treeNodeObject = TreeNodeObject.create({ caption: caption, nodes:nodes });
      ret.addObject(treeNodeObject);
    }
    return ret;
  },
  /*Ember.A([
      TreeNodeObject.create({
        caption: 'Folder',
        nodes: Ember.A([
          TreeNodeObject.create({
            caption: 'Пользователь 1',
            nodes: null
          }),
          TreeNodeObject.create({
            caption: 'Пользователь 2',
            nodes: null
          })
        ])
      }),

      TreeNodeObject.create({
        caption: 'Конкурсы',
        nodes: Ember.A([
          TreeNodeObject.create({
            caption: 'Конкурс1',
            nodes: null
          }),
          TreeNodeObject.create({
            caption: 'Конкурс2',
            nodes: null
          })
        ])
      }),

  ])*/

  lastClicked: {
    left: {
      path: null,
      element: null
    },
    right: {
      path: null,
      element: null
    }
  },

  actions: {

    onTreenodeHeaderClick(...args) {
      let actionEventObject = args[args.length - 1];
      let clickedNodePropertiesPath = args[0];
      let clickedNodeSettingsPrefix = Ember.$(actionEventObject.originalEvent.currentTarget)
        .closest('.tab.segment')
        .attr('data-tab');

      let lastClicked = null;
      let clickedElement = actionEventObject.originalEvent.toElement;
      if (clickedElement.tagName === 'DIV') {
        if (clickedNodePropertiesPath.substr(0, 8) === 'jsonLeft') {
          lastClicked = this.lastClicked.left;
        } else if (clickedNodePropertiesPath.substr(0, 9) === 'jsonRight') {
          lastClicked = this.lastClicked.right;
        }

        if (lastClicked) {
          if (lastClicked.element) {
            lastClicked.element.style.backgroundColor = '';
          }

          lastClicked.element = clickedElement;
          lastClicked.element.style.backgroundColor='#cccccc';
          lastClicked.path = clickedNodePropertiesPath;
        }
      }
    },



    moveRightHighlighted() {
      let lastClicked = this.lastClicked.left;
    }

  }

});
