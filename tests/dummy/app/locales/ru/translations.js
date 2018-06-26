import Ember from 'ember';
import EmberFlexberryDesignerTranslations from 'ember-flexberry-designer/locales/ru/translations';

const translations = {};
Ember.$.extend(true, translations, EmberFlexberryDesignerTranslations);

Ember.$.extend(true, translations, {

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

          'fd-visual-listform': {
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
