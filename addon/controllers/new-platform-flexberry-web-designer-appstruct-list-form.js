import Ember from 'ember';
import FlexberryTreenodeActionsHandlerMixin from 'ember-flexberry/mixins/flexberry-treenode-actions-handler';
import TreeNodeObject from 'ember-flexberry/objects/tree-node';

export default Ember.Controller.extend(FlexberryTreenodeActionsHandlerMixin, {

  jsonTreeNodesLeft: Ember.A([
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

  jsonTreeNodesRight: Ember.A([
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

  ])
  
  
  
});
