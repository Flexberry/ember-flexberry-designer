import Ember from 'ember';
import FlexberryTreenodeActionsHandlerMixin from 'ember-flexberry/mixins/flexberry-treenode-actions-handler';
import TreeNodeObject from 'ember-flexberry/objects/tree-node';

export default Ember.Controller.extend(FlexberryTreenodeActionsHandlerMixin, {
  
  leftClickedElement: null,
  leftClickedPath: null,
  
  jsonLeftTreeCollapsible: true,
  jsonLeftTreeClass: 'styled',

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

  jsonRightTreeNodes: Ember.A([
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

  ]),
  
  lastClicked: {
    'left': {
      path: null,
      element: null
    },
    'right': {
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
      if (clickedElement.tagName == 'DIV') {
        if (clickedNodePropertiesPath.substr(0,8) == 'jsonLeft') {
          lastClicked = this.lastClicked.left;
        } else if (clickedNodePropertiesPath.substr(0,9) == 'jsonRight') {
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

    moveLeftHighlighted() {
      let lastRightClicked = this.lastClicked.left;
    },
    
    moveRightHighlighted() {
      let lastLeftClicked = this.lastClicked.right;
    }
    
    
  }
  
  
});
