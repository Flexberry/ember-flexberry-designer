import Ember from 'ember';
import EmberFlexberryTranslations from 'ember-flexberry/locales/ru/translations';

import NewPlatformFlexberryWebDesignerAssociationListFormForm from './forms/new-platform-flexberry-web-designer-association-list-form';
import NewPlatformFlexberryWebDesignerClassListFormForm from './forms/new-platform-flexberry-web-designer-class-list-form';
import NewPlatformFlexberryWebDesignerDiagramListFormForm from './forms/new-platform-flexberry-web-designer-diagram-list-form';
import NewPlatformFlexberryWebDesignerInheritanceListFormForm from './forms/new-platform-flexberry-web-designer-inheritance-list-form';
import NewPlatformFlexberryWebDesignerStageListFormForm from './forms/new-platform-flexberry-web-designer-stage-list-form';
import NewPlatformFlexberryWebDesignerSystemListFormForm from './forms/new-platform-flexberry-web-designer-system-list-form';
import NewPlatformFlexberryWebDesignerViewListFormForm from './forms/new-platform-flexberry-web-designer-view-list-form';
import NewPlatformFlexberryWebDesignerAssociationEditFormForm from './forms/new-platform-flexberry-web-designer-association-edit-form';
import NewPlatformFlexberryWebDesignerClassEditFormForm from './forms/new-platform-flexberry-web-designer-class-edit-form';
import NewPlatformFlexberryWebDesignerDiagramEditFormForm from './forms/new-platform-flexberry-web-designer-diagram-edit-form';
import NewPlatformFlexberryWebDesignerInheritanceEditFormForm from './forms/new-platform-flexberry-web-designer-inheritance-edit-form';
import NewPlatformFlexberryWebDesignerStageEditFormForm from './forms/new-platform-flexberry-web-designer-stage-edit-form';
import NewPlatformFlexberryWebDesignerSystemEditFormForm from './forms/new-platform-flexberry-web-designer-system-edit-form';
import NewPlatformFlexberryWebDesignerViewEditFormForm from './forms/new-platform-flexberry-web-designer-view-edit-form';
import NewPlatformFlexberryWebDesignerADModel from './models/new-platform-flexberry-web-designer-a-d';
import NewPlatformFlexberryWebDesignerAggregationModel from './models/new-platform-flexberry-web-designer-aggregation';
import NewPlatformFlexberryWebDesignerAssociationModel from './models/new-platform-flexberry-web-designer-association';
import NewPlatformFlexberryWebDesignerBaseAssociationModel from './models/new-platform-flexberry-web-designer-base-association';
import NewPlatformFlexberryWebDesignerCADModel from './models/new-platform-flexberry-web-designer-c-a-d';
import NewPlatformFlexberryWebDesignerCODModel from './models/new-platform-flexberry-web-designer-c-o-d';
import NewPlatformFlexberryWebDesignerCasePropertyModel from './models/new-platform-flexberry-web-designer-case-property';
import NewPlatformFlexberryWebDesignerClassModel from './models/new-platform-flexberry-web-designer-class';
import NewPlatformFlexberryWebDesignerConfigurationModel from './models/new-platform-flexberry-web-designer-configuration';
import NewPlatformFlexberryWebDesignerDPDModel from './models/new-platform-flexberry-web-designer-d-p-d';
import NewPlatformFlexberryWebDesignerDevAggregationModel from './models/new-platform-flexberry-web-designer-dev-aggregation';
import NewPlatformFlexberryWebDesignerDevAssociatedDetailViewModel from './models/new-platform-flexberry-web-designer-dev-associated-detail-view';
import NewPlatformFlexberryWebDesignerDevAssociationModel from './models/new-platform-flexberry-web-designer-dev-association';
import NewPlatformFlexberryWebDesignerDevAttributeModel from './models/new-platform-flexberry-web-designer-dev-attribute';
import NewPlatformFlexberryWebDesignerDevBaseAssociationModel from './models/new-platform-flexberry-web-designer-dev-base-association';
import NewPlatformFlexberryWebDesignerDevClassModel from './models/new-platform-flexberry-web-designer-dev-class';
import NewPlatformFlexberryWebDesignerDevControlTypeModel from './models/new-platform-flexberry-web-designer-dev-control-type';
import NewPlatformFlexberryWebDesignerDevDiagramLinkModel from './models/new-platform-flexberry-web-designer-dev-diagram-link';
import NewPlatformFlexberryWebDesignerDevFilelinkModel from './models/new-platform-flexberry-web-designer-dev-filelink';
import NewPlatformFlexberryWebDesignerDevFormControlModel from './models/new-platform-flexberry-web-designer-dev-form-control';
import NewPlatformFlexberryWebDesignerDevFormViewModel from './models/new-platform-flexberry-web-designer-dev-form-view';
import NewPlatformFlexberryWebDesignerDevInheritanceModel from './models/new-platform-flexberry-web-designer-dev-inheritance';
import NewPlatformFlexberryWebDesignerDevMethodModel from './models/new-platform-flexberry-web-designer-dev-method';
import NewPlatformFlexberryWebDesignerDevModuleSettingTypeModel from './models/new-platform-flexberry-web-designer-dev-module-setting-type';
import NewPlatformFlexberryWebDesignerDevModuleSettingModel from './models/new-platform-flexberry-web-designer-dev-module-setting';
import NewPlatformFlexberryWebDesignerDevParameterModel from './models/new-platform-flexberry-web-designer-dev-parameter';
import NewPlatformFlexberryWebDesignerDevProcessStatusModel from './models/new-platform-flexberry-web-designer-dev-process-status';
import NewPlatformFlexberryWebDesignerDevStageModel from './models/new-platform-flexberry-web-designer-dev-stage';
import NewPlatformFlexberryWebDesignerDevSystemModel from './models/new-platform-flexberry-web-designer-dev-system';
import NewPlatformFlexberryWebDesignerDevTaskModel from './models/new-platform-flexberry-web-designer-dev-task';
import NewPlatformFlexberryWebDesignerDevTypeDefinitionModel from './models/new-platform-flexberry-web-designer-dev-type-definition';
import NewPlatformFlexberryWebDesignerDevUMLADModel from './models/new-platform-flexberry-web-designer-dev-u-m-l-a-d';
import NewPlatformFlexberryWebDesignerDevUMLCADModel from './models/new-platform-flexberry-web-designer-dev-u-m-l-c-a-d';
import NewPlatformFlexberryWebDesignerDevUMLCODModel from './models/new-platform-flexberry-web-designer-dev-u-m-l-c-o-d';
import NewPlatformFlexberryWebDesignerDevUMLDPDModel from './models/new-platform-flexberry-web-designer-dev-u-m-l-d-p-d';
import NewPlatformFlexberryWebDesignerDevUMLSDModel from './models/new-platform-flexberry-web-designer-dev-u-m-l-s-d';
import NewPlatformFlexberryWebDesignerDevUMLSTDModel from './models/new-platform-flexberry-web-designer-dev-u-m-l-s-t-d';
import NewPlatformFlexberryWebDesignerDevUMLUCDModel from './models/new-platform-flexberry-web-designer-dev-u-m-l-u-c-d';
import NewPlatformFlexberryWebDesignerDevViewModel from './models/new-platform-flexberry-web-designer-dev-view';
import NewPlatformFlexberryWebDesignerDiagramLinkModel from './models/new-platform-flexberry-web-designer-diagram-link';
import NewPlatformFlexberryWebDesignerDiagramModel from './models/new-platform-flexberry-web-designer-diagram';
import NewPlatformFlexberryWebDesignerFilelinkModel from './models/new-platform-flexberry-web-designer-filelink';
import NewPlatformFlexberryWebDesignerFormControlModel from './models/new-platform-flexberry-web-designer-form-control';
import NewPlatformFlexberryWebDesignerFormViewModel from './models/new-platform-flexberry-web-designer-form-view';
import NewPlatformFlexberryWebDesignerInheritanceModel from './models/new-platform-flexberry-web-designer-inheritance';
import NewPlatformFlexberryWebDesignerObjectInSystemModel from './models/new-platform-flexberry-web-designer-object-in-system';
import NewPlatformFlexberryWebDesignerPluginOnRepObjectModel from './models/new-platform-flexberry-web-designer-plugin-on-rep-object';
import NewPlatformFlexberryWebDesignerProjectModel from './models/new-platform-flexberry-web-designer-project';
import NewPlatformFlexberryWebDesignerRegisteredPlugInModel from './models/new-platform-flexberry-web-designer-registered-plug-in';
import NewPlatformFlexberryWebDesignerRepositoryBrowserDataObjectWithACLModel from './models/new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l';
import NewPlatformFlexberryWebDesignerRepositoryBrowserDataObjectModel from './models/new-platform-flexberry-web-designer-repository-browser-data-object';
import NewPlatformFlexberryWebDesignerRepositoryDataObjectModel from './models/new-platform-flexberry-web-designer-repository-data-object';
import NewPlatformFlexberryWebDesignerRepositoryObjectWithPluginsModel from './models/new-platform-flexberry-web-designer-repository-object-with-plugins';
import NewPlatformFlexberryWebDesignerRepositoryRefDataObjectModel from './models/new-platform-flexberry-web-designer-repository-ref-data-object';
import NewPlatformFlexberryWebDesignerRepositoryModel from './models/new-platform-flexberry-web-designer-repository';
import NewPlatformFlexberryWebDesignerSDModel from './models/new-platform-flexberry-web-designer-s-d';
import NewPlatformFlexberryWebDesignerSTDModel from './models/new-platform-flexberry-web-designer-s-t-d';
import NewPlatformFlexberryWebDesignerStageModel from './models/new-platform-flexberry-web-designer-stage';
import NewPlatformFlexberryWebDesignerSubsystemModel from './models/new-platform-flexberry-web-designer-subsystem';
import NewPlatformFlexberryWebDesignerUCDModel from './models/new-platform-flexberry-web-designer-u-c-d';
import NewPlatformFlexberryWebDesignerViewModel from './models/new-platform-flexberry-web-designer-view';

const translations = {};
Ember.$.extend(true, translations, EmberFlexberryTranslations);

Ember.$.extend(true, translations, {
  models: {
    'new-platform-flexberry-web-designer-a-d': NewPlatformFlexberryWebDesignerADModel,
    'new-platform-flexberry-web-designer-aggregation': NewPlatformFlexberryWebDesignerAggregationModel,
    'new-platform-flexberry-web-designer-association': NewPlatformFlexberryWebDesignerAssociationModel,
    'new-platform-flexberry-web-designer-base-association': NewPlatformFlexberryWebDesignerBaseAssociationModel,
    'new-platform-flexberry-web-designer-c-a-d': NewPlatformFlexberryWebDesignerCADModel,
    'new-platform-flexberry-web-designer-c-o-d': NewPlatformFlexberryWebDesignerCODModel,
    'new-platform-flexberry-web-designer-case-property': NewPlatformFlexberryWebDesignerCasePropertyModel,
    'new-platform-flexberry-web-designer-class': NewPlatformFlexberryWebDesignerClassModel,
    'new-platform-flexberry-web-designer-configuration': NewPlatformFlexberryWebDesignerConfigurationModel,
    'new-platform-flexberry-web-designer-d-p-d': NewPlatformFlexberryWebDesignerDPDModel,
    'new-platform-flexberry-web-designer-dev-aggregation': NewPlatformFlexberryWebDesignerDevAggregationModel,
    'new-platform-flexberry-web-designer-dev-associated-detail-view': NewPlatformFlexberryWebDesignerDevAssociatedDetailViewModel,
    'new-platform-flexberry-web-designer-dev-association': NewPlatformFlexberryWebDesignerDevAssociationModel,
    'new-platform-flexberry-web-designer-dev-attribute': NewPlatformFlexberryWebDesignerDevAttributeModel,
    'new-platform-flexberry-web-designer-dev-base-association': NewPlatformFlexberryWebDesignerDevBaseAssociationModel,
    'new-platform-flexberry-web-designer-dev-class': NewPlatformFlexberryWebDesignerDevClassModel,
    'new-platform-flexberry-web-designer-dev-control-type': NewPlatformFlexberryWebDesignerDevControlTypeModel,
    'new-platform-flexberry-web-designer-dev-diagram-link': NewPlatformFlexberryWebDesignerDevDiagramLinkModel,
    'new-platform-flexberry-web-designer-dev-filelink': NewPlatformFlexberryWebDesignerDevFilelinkModel,
    'new-platform-flexberry-web-designer-dev-form-control': NewPlatformFlexberryWebDesignerDevFormControlModel,
    'new-platform-flexberry-web-designer-dev-form-view': NewPlatformFlexberryWebDesignerDevFormViewModel,
    'new-platform-flexberry-web-designer-dev-inheritance': NewPlatformFlexberryWebDesignerDevInheritanceModel,
    'new-platform-flexberry-web-designer-dev-method': NewPlatformFlexberryWebDesignerDevMethodModel,
    'new-platform-flexberry-web-designer-dev-module-setting-type': NewPlatformFlexberryWebDesignerDevModuleSettingTypeModel,
    'new-platform-flexberry-web-designer-dev-module-setting': NewPlatformFlexberryWebDesignerDevModuleSettingModel,
    'new-platform-flexberry-web-designer-dev-parameter': NewPlatformFlexberryWebDesignerDevParameterModel,
    'new-platform-flexberry-web-designer-dev-process-status': NewPlatformFlexberryWebDesignerDevProcessStatusModel,
    'new-platform-flexberry-web-designer-dev-stage': NewPlatformFlexberryWebDesignerDevStageModel,
    'new-platform-flexberry-web-designer-dev-system': NewPlatformFlexberryWebDesignerDevSystemModel,
    'new-platform-flexberry-web-designer-dev-task': NewPlatformFlexberryWebDesignerDevTaskModel,
    'new-platform-flexberry-web-designer-dev-type-definition': NewPlatformFlexberryWebDesignerDevTypeDefinitionModel,
    'new-platform-flexberry-web-designer-dev-u-m-l-a-d': NewPlatformFlexberryWebDesignerDevUMLADModel,
    'new-platform-flexberry-web-designer-dev-u-m-l-c-a-d': NewPlatformFlexberryWebDesignerDevUMLCADModel,
    'new-platform-flexberry-web-designer-dev-u-m-l-c-o-d': NewPlatformFlexberryWebDesignerDevUMLCODModel,
    'new-platform-flexberry-web-designer-dev-u-m-l-d-p-d': NewPlatformFlexberryWebDesignerDevUMLDPDModel,
    'new-platform-flexberry-web-designer-dev-u-m-l-s-d': NewPlatformFlexberryWebDesignerDevUMLSDModel,
    'new-platform-flexberry-web-designer-dev-u-m-l-s-t-d': NewPlatformFlexberryWebDesignerDevUMLSTDModel,
    'new-platform-flexberry-web-designer-dev-u-m-l-u-c-d': NewPlatformFlexberryWebDesignerDevUMLUCDModel,
    'new-platform-flexberry-web-designer-dev-view': NewPlatformFlexberryWebDesignerDevViewModel,
    'new-platform-flexberry-web-designer-diagram-link': NewPlatformFlexberryWebDesignerDiagramLinkModel,
    'new-platform-flexberry-web-designer-diagram': NewPlatformFlexberryWebDesignerDiagramModel,
    'new-platform-flexberry-web-designer-filelink': NewPlatformFlexberryWebDesignerFilelinkModel,
    'new-platform-flexberry-web-designer-form-control': NewPlatformFlexberryWebDesignerFormControlModel,
    'new-platform-flexberry-web-designer-form-view': NewPlatformFlexberryWebDesignerFormViewModel,
    'new-platform-flexberry-web-designer-inheritance': NewPlatformFlexberryWebDesignerInheritanceModel,
    'new-platform-flexberry-web-designer-object-in-system': NewPlatformFlexberryWebDesignerObjectInSystemModel,
    'new-platform-flexberry-web-designer-plugin-on-rep-object': NewPlatformFlexberryWebDesignerPluginOnRepObjectModel,
    'new-platform-flexberry-web-designer-project': NewPlatformFlexberryWebDesignerProjectModel,
    'new-platform-flexberry-web-designer-registered-plug-in': NewPlatformFlexberryWebDesignerRegisteredPlugInModel,
    'new-platform-flexberry-web-designer-repository-browser-data-object-with-a-c-l': NewPlatformFlexberryWebDesignerRepositoryBrowserDataObjectWithACLModel,
    'new-platform-flexberry-web-designer-repository-browser-data-object': NewPlatformFlexberryWebDesignerRepositoryBrowserDataObjectModel,
    'new-platform-flexberry-web-designer-repository-data-object': NewPlatformFlexberryWebDesignerRepositoryDataObjectModel,
    'new-platform-flexberry-web-designer-repository-object-with-plugins': NewPlatformFlexberryWebDesignerRepositoryObjectWithPluginsModel,
    'new-platform-flexberry-web-designer-repository-ref-data-object': NewPlatformFlexberryWebDesignerRepositoryRefDataObjectModel,
    'new-platform-flexberry-web-designer-repository': NewPlatformFlexberryWebDesignerRepositoryModel,
    'new-platform-flexberry-web-designer-s-d': NewPlatformFlexberryWebDesignerSDModel,
    'new-platform-flexberry-web-designer-s-t-d': NewPlatformFlexberryWebDesignerSTDModel,
    'new-platform-flexberry-web-designer-stage': NewPlatformFlexberryWebDesignerStageModel,
    'new-platform-flexberry-web-designer-subsystem': NewPlatformFlexberryWebDesignerSubsystemModel,
    'new-platform-flexberry-web-designer-u-c-d': NewPlatformFlexberryWebDesignerUCDModel,
    'new-platform-flexberry-web-designer-view': NewPlatformFlexberryWebDesignerViewModel,
  },

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
        root: {
          caption: 'Root',
          title: 'Root',
          'new-platform-flexberry-web-designer-stage-list-form': {
            caption: 'Stages',
            title: '',

          },
          'new-platform-flexberry-web-designer-system-list-form': {
            caption: 'Systems',
            title: '',

          },
          'new-platform-flexberry-web-designer-diagram-list-form': {
            caption: 'Diagrams',
            title: '',

          },
          'new-platform-flexberry-web-designer-class-list-form': {
            caption: 'Classes',
            title: '',

          },
          'new-platform-flexberry-web-designer-association-list-form': {
            caption: 'Associations',
            title: '',

          },
          'new-platform-flexberry-web-designer-inheritance-list-form': {
            caption: 'Inheritance',
            title: '',

          },
          'new-platform-flexberry-web-designer-view-list-form': {
            caption: 'Views',
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
    'new-platform-flexberry-web-designer-association-list-form': NewPlatformFlexberryWebDesignerAssociationListFormForm,
    'new-platform-flexberry-web-designer-class-list-form': NewPlatformFlexberryWebDesignerClassListFormForm,
    'new-platform-flexberry-web-designer-diagram-list-form': NewPlatformFlexberryWebDesignerDiagramListFormForm,
    'new-platform-flexberry-web-designer-inheritance-list-form': NewPlatformFlexberryWebDesignerInheritanceListFormForm,
    'new-platform-flexberry-web-designer-stage-list-form': NewPlatformFlexberryWebDesignerStageListFormForm,
    'new-platform-flexberry-web-designer-system-list-form': NewPlatformFlexberryWebDesignerSystemListFormForm,
    'new-platform-flexberry-web-designer-view-list-form': NewPlatformFlexberryWebDesignerViewListFormForm,
    'new-platform-flexberry-web-designer-association-edit-form': NewPlatformFlexberryWebDesignerAssociationEditFormForm,
    'new-platform-flexberry-web-designer-class-edit-form': NewPlatformFlexberryWebDesignerClassEditFormForm,
    'new-platform-flexberry-web-designer-diagram-edit-form': NewPlatformFlexberryWebDesignerDiagramEditFormForm,
    'new-platform-flexberry-web-designer-inheritance-edit-form': NewPlatformFlexberryWebDesignerInheritanceEditFormForm,
    'new-platform-flexberry-web-designer-stage-edit-form': NewPlatformFlexberryWebDesignerStageEditFormForm,
    'new-platform-flexberry-web-designer-system-edit-form': NewPlatformFlexberryWebDesignerSystemEditFormForm,
    'new-platform-flexberry-web-designer-view-edit-form': NewPlatformFlexberryWebDesignerViewEditFormForm,
  },

});

export default translations;
