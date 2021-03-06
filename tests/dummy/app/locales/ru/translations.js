import $ from 'jquery';

import EmberFlexberryDesignerTranslations from 'ember-flexberry-designer/locales/ru/translations';

const translations = {};
$.extend(true, translations, EmberFlexberryDesignerTranslations);

$.extend(true, translations, {

  'application-name': '',

  forms: {
    loading: {
      'spinner-caption': 'Данные загружаются, пожалуйста подождите...'
    },
    index: {
      greeting: 'Добро пожаловать на тестовый стенд ember-flexberry!'
    },

    application: {
      header: {
        menu: {
          'sitemap-button': {
            caption: '',
            title: 'Меню'
          },
          'user-settings-service-checkbox': {
            caption: 'Использовать сервис сохранения пользовательских настроек'
          },
          'show-menu': {
            caption: 'Показать меню'
          },
          'hide-menu': {
            caption: 'Скрыть меню'
          },
          'language-dropdown': {
            caption: 'Язык приложения',
            placeholder: 'Выберите язык'
          }
        },
        login: {
          caption: 'Вход'
        },
        logout: {
          caption: 'Выход'
        }
      },

      footer: {
        'application-name': '',
        'application-version': {
          caption: 'Версия аддона {{version}}',
          title: 'Это версия аддона ember-flexberry, которая сейчас используется в этом тестовом приложении ' +
          '(версия npm-пакета + хэш коммита). ' +
          'Кликните, чтобы перейти на GitHub.'
        },
        'copyright': 'Copyright © New platform Ltd. 2018 Создано при поддержке Фонда содействия ' +
        'развитию малых форм предприятий в научно-технической сфере (программа СТАРТ-2013).',
        'copyright-version': {
          title: 'Copyright © New platform Ltd. 2018 Создано при поддержке Фонда содействия ' +
           'развитию малых форм предприятий в научно-технической сфере (программа СТАРТ-2013).'
        }
      },

      sitemap: {
        'application-name': {
          caption: '',
          title: ''
        },
        'application-version': {
          caption: 'Версия аддона {{version}}',
          title: 'Это версия аддона ember-flexberry, которая сейчас используется в этом тестовом приложении ' +
          '(версия npm-пакета + хэш коммита). ' +
          'Кликните, чтобы перейти на GitHub.'
        },
        index: {
          caption: 'Главная',
          title: ''
        },
        'fd-visual-edit-form': {
          caption: 'Конструктор формы редактирования',
          title: ''
        },
        root: {
          caption: 'Root',
          title: 'Root',

          'fd-appstruct-form': {
            caption: 'Структура приложения',
            title: '',

          },

          'fd-listform-constructor': {
            caption: 'Конструктор списковой формы',
            title: '',
          },

          'fd-configuration-list-form': {
            caption: 'Организации',
            title: '',

          },
          'fd-stage-list-form': {
            caption: 'Проекты',
            title: '',

          },
          'additional': {
            caption: 'Дополнительно',
            title: '',
          },
          'fd-system-list-form': {
            caption: 'Подсистемы',
            title: '',

          },
          'fd-diagram-list-form': {
            caption: 'Диаграммы',
            title: '',

          },
          'fd-class-list-form': {
            caption: 'Классы',
            title: '',

          },
          'fd-association-list-form': {
            caption: 'Ассоциации',
            title: '',

          },
          'fd-aggregation-list-form': {
            caption: 'Аггрегации',
            title: '',

          },
          'fd-inheritance-list-form': {
            caption: 'Наследование',
            title: '',

          },
          'fd-view-list-form': {
            caption: 'Представления',
            title: '',

          },
          'fd-generation-process-form': {
            caption: 'Генерация',
            title: '',
          },
          'fd-generation-list-form': {
            caption: 'Список генераций',
            title: '',
          },
          'fd-uml-primitives': {
            caption: 'UML',
            title: '',
          },
          'class-diagram-primitives-demo': {
            caption: 'Диаграмма классов',
            title: '',
          },
          'activity-diagram-primitives-demo': {
            caption: 'Диаграмма активностей',
            title: '',
          },
          'deployment-diagram-primitives-demo': {
            caption: 'Диаграмма развертывания',
            title: '',
          },
          'statechart-diagram-primitives-demo': {
            caption: 'Диаграмма состояний',
            title: '',
          },
          'usecase-diagram-primitives-demo': {
            caption: 'Диаграмма вариантов использования',
            title: '',
          },
          'sequence-diagram-primitives-demo': {
            caption: 'Диаграмма последовательности',
            title: '',
          },
          'collaboration-diagram-primitives-demo': {
            caption: 'Диаграмма сотрудничества',
            title: '',
          },
          'fd-data-types-map': {
            caption: 'Карта типов данных',
            title: '',
          }
        },
      }
    },

    'edit-form': {
      'save-success-message-caption': 'Сохранение завершилось успешно',
      'save-success-message': 'Объект сохранен',
      'save-error-message-caption': 'Ошибка сохранения',
      'delete-success-message-caption': 'Удаление завершилось успешно',
      'delete-success-message': 'Объект удален',
      'delete-error-message-caption': 'Ошибка удаления'
    },
  },

});

export default translations;
