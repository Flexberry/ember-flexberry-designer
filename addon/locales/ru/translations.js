import $ from 'jquery';

import EmberFlexberryTranslations from 'ember-flexberry/locales/ru/translations';
import FdAppstructListFormForm from './forms/fd-appstruct-form';
import FdAggregationListFormForm from './forms/fd-aggregation-list-form';
import FdAllProjects from './forms/fd-all-projects';
import FdAssociationListFormForm from './forms/fd-association-list-form';
import FdClassListFormForm from './forms/fd-class-list-form';
import FdConfigurationListFormForm from './forms/fd-configuration-list-form';
import FdDiagramListFormForm from './forms/fd-diagram-list-form';
import FdEditformConstructor from './forms/fd-editform-constructor';
import FdInheritanceListFormForm from './forms/fd-inheritance-list-form';
import FdStageListFormForm from './forms/fd-stage-list-form';
import FdSystemListFormForm from './forms/fd-system-list-form';
import FdViewListFormForm from './forms/fd-view-list-form';
import FdAggregationEditFormForm from './forms/fd-aggregation-edit-form';
import NewPlatformFlexberryWebDesignerGenerationLForm from './forms/new-platform-flexberry-web-designer-generation-l';
import NewPlatformFlexberryWebDesignerStorageTypeLForm from './forms/new-platform-flexberry-web-designer-storage-type-l';
import FdApplicationEditFormForm from './forms/fd-application-edit-form';
import FdAssociationEditFormForm from './forms/fd-association-edit-form';
import FdBusinessServerEditFormForm from './forms/fd-business-server-edit-form';
import FdClassEditFormForm from './forms/fd-class-edit-form';
import FdConfigurationEditFormForm from './forms/fd-configuration-edit-form';
import FdDiagramEditFormForm from './forms/fd-diagram-edit-form';
import FdEditFormEditFormForm from './forms/fd-edit-form-edit-form';
import FdEnumEditFormForm from './forms/fd-enum-edit-form';
import FdExternalEditFormForm from './forms/fd-external-edit-form';
import FdInheritanceEditFormForm from './forms/fd-inheritance-edit-form';
import FdInterfaceEditFormForm from './forms/fd-interface-edit-form';
import FdListFormEditFormForm from './forms/fd-list-form-edit-form';
import FdStageEditFormForm from './forms/fd-stage-edit-form';
import FdSystemEditFormForm from './forms/fd-system-edit-form';
import FdTypeEditFormForm from './forms/fd-type-edit-form';
import FdUserFormEditFormForm from './forms/fd-user-form-edit-form';
import FdViewEditFormForm from './forms/fd-view-edit-form';
import FdVisualEditFormForm from './forms/fd-visual-edit-form';
import FdListformConstructor from './forms/fd-listform-constructor';
import FdGenerationProcessForm from './forms/fd-generation-process-form';
import FdGeneration from './forms/fd-generation';
import FdSetting from './forms/fd-setting';
import FdGenerationListForm from './forms/fd-generation-list-form';
import FdDataTypesMapForm from './forms/fd-data-types-map';
import FdConfirmUnsavedFormModal from './forms/fd-confirm-unsaved-form-modal';
import FdEditForm from './forms/fd-edit-form';
import NewPlatformFlexberryWebDesignerGenerationEForm from './forms/new-platform-flexberry-web-designer-generation-e';
import NewPlatformFlexberryWebDesignerStorageTypeEForm from './forms/new-platform-flexberry-web-designer-storage-type-e';
import FdDiagramForm from './forms/fd-diagrams';
import FdNavigationForm from './forms/fd-navigation';
import FdAdModel from './models/fd-ad';
import FdAggregationModel from './models/fd-aggregation';
import FdApplicationUserModel from './models/fd-application-user';
import FdAssociationModel from './models/fd-association';
import FdAuthTypeModel from './models/fd-auth-type';
import FdBaseAssociationModel from './models/fd-base-association';
import FdCadModel from './models/fd-cad';
import FdCasePropertyModel from './models/fd-case-property';
import FdClassStorageTypeModel from './models/fd-class-storage-type';
import FdClassModel from './models/fd-class';
import FdCodModel from './models/fd-cod';
import FdConfigurationModel from './models/fd-configuration';
import FdDevAggregationModel from './models/fd-dev-aggregation';
import FdDevAssociatedDetailViewModel from './models/fd-dev-associated-detail-view';
import FdDevAssociationModel from './models/fd-dev-association';
import FdDevAttributeModel from './models/fd-dev-attribute';
import FdDevBaseAssociationModel from './models/fd-dev-base-association';
import FdDevClassModel from './models/fd-dev-class';
import FdDevControlTypeModel from './models/fd-dev-control-type';
import FdDevDiagramLinkModel from './models/fd-dev-diagram-link';
import FdDevFilelinkModel from './models/fd-dev-filelink';
import FdDevFormControlModel from './models/fd-dev-form-control';
import FdDevFormViewModel from './models/fd-dev-form-view';
import FdDevInheritanceModel from './models/fd-dev-inheritance';
import FdDevMethodModel from './models/fd-dev-method';
import FdDevModuleSettingTypeModel from './models/fd-dev-module-setting-type';
import FdDevModuleSettingModel from './models/fd-dev-module-setting';
import FdDevParameterModel from './models/fd-dev-parameter';
import FdDevProcessStatusModel from './models/fd-dev-process-status';
import FdDevStageHistoryModel from './models/fd-dev-stage-history';
import FdDevStageModel from './models/fd-dev-stage';
import FdDevSystemModel from './models/fd-dev-system';
import FdDevTaskModel from './models/fd-dev-task';
import FdDevTypeDefinitionModel from './models/fd-dev-type-definition';
import FdDevUmlAdModel from './models/fd-dev-uml-ad';
import FdDevUmlCadModel from './models/fd-dev-uml-cad';
import FdDevUmlCodModel from './models/fd-dev-uml-cod';
import FdDevUmlDpdModel from './models/fd-dev-uml-dpd';
import FdDevUmlSdModel from './models/fd-dev-uml-sd';
import FdDevUmlStdModel from './models/fd-dev-uml-std';
import FdDevUmlUcdModel from './models/fd-dev-uml-ucd';
import FdDevViewModel from './models/fd-dev-view';
import FdDiagramLinkModel from './models/fd-diagram-link';
import FdDiagramModel from './models/fd-diagram';
import FdDpdModel from './models/fd-dpd';
import FdFilelinkModel from './models/fd-filelink';
import FdFollowingModel from './models/fd-following';
import FdFormControlModel from './models/fd-form-control';
import FdFormViewModel from './models/fd-form-view';
import FdGenerationStepLogModel from './models/fd-generation-step-log';
import FdGenerationModel from './models/fd-generation';
import FdInheritanceModel from './models/fd-inheritance';
import FdObjectInSystemModel from './models/fd-object-in-system';
import FdPluginOnRepObjectModel from './models/fd-plugin-on-rep-object';
import FdProjectModel from './models/fd-project';
import FdRegisteredPlugInModel from './models/fd-registered-plug-in';
import FdRepositoryBrowserDataObjectWithACLModel from './models/fd-repository-browser-data-object-with-a-c-l';
import FdRepositoryBrowserDataObjectModel from './models/fd-repository-browser-data-object';
import FdRepositoryDataObjectModel from './models/fd-repository-data-object';
import FdRepositoryObjectWithPluginsModel from './models/fd-repository-object-with-plugins';
import FdRepositoryRefDataObjectModel from './models/fd-repository-ref-data-object';
import FdRepositoryModel from './models/fd-repository';
import FdSdModel from './models/fd-sd';
import FdStageModel from './models/fd-stage';
import FdStdModel from './models/fd-std';
import FdStorageTypeModel from './models/fd-storage-type';
import FdSubsystemModel from './models/fd-subsystem';
import FdUcdModel from './models/fd-ucd';
import FdUserAuthProfileModel from './models/fd-user-auth-profile';
import FdUserInStageModel from './models/fd-user-in-stage';
import FdViewModel from './models/fd-view';
import FdVisualControlModel from './models/fd-visual-control';
import FdVisualControlComponent from './components/fd-visual-control';
import FdVisualEditControlTreeComponent from './components/fd-visual-edit-control-tree';
import FdTabs from './components/fd-tabs';
import FdAttributeTable from './components/fd-attribute-table';
import FdClassEditingPanel from './components/fd-implementation-editing-panel';
import FdUserformEditingPanel from './components/fd-userform-editing-panel';
import FdTypeEditingPanel from './components/fd-type-editing-panel';
import FdExternalEditingPanel from './components/fd-external-editing-panel';
import FdCustomEditingPanel from './components/fd-custom-editing-panel';
import FdApplicationEditingPanel from './components/fd-application-editing-panel';
import FdInterfaceEditingPanel from './components/fd-interface-editing-panel';
import FdBsEditingPanel from './components/fd-businessserver-editing-panel';
import FdEnumEditingPanel from './components/fd-enumeration-editing-panel';
import FdEditFormEditingPanel from './components/fd-editform-editing-panel';
import FdListFormEditingPanel from './components/fd-listform-editing-panel';
import FdGeolayerFormEditingPanel from './components/fd-geolayer-editing-panel';
import FdGeolayerstyleFormEditingPanel from './components/fd-geolayerstyle-editing-panel';
import FdCreateView from './components/fd-create-view';
import FdCreateEntity from './components/fd-create-entity';
import FdCreateDiagrams from './components/fd-create-diagrams';
import FdSheetToolBar from './components/fd-sheets-tool-bar';
import FdCreateNodeEditingPanel from './components/fd-create-node-editing-panel';
import FdFolderEditingPanel from './components/fd-folder-editing-panel';
import FdPropertyEditingPanel from './components/fd-property-editing-panel';
import FdViewDefinitionItem from './components/fd-view-definition-item';
import FdfModalMessageBox from './components/fd-modal-message-box';
import FdApplicationModelForm from './forms/fd-application-model';

const translations = {};
$.extend(true, translations, EmberFlexberryTranslations);

$.extend(true, translations, {
  models: {
    'fd-ad': FdAdModel,
    'fd-aggregation': FdAggregationModel,
    'fd-application-user': FdApplicationUserModel,
    'fd-association': FdAssociationModel,
    'fd-auth-type': FdAuthTypeModel,
    'fd-base-association': FdBaseAssociationModel,
    'fd-cad': FdCadModel,
    'fd-case-property': FdCasePropertyModel,
    'fd-class-storage-type': FdClassStorageTypeModel,
    'fd-class': FdClassModel,
    'fd-cod': FdCodModel,
    'fd-configuration': FdConfigurationModel,
    'fd-dev-aggregation': FdDevAggregationModel,
    'fd-dev-associated-detail-view': FdDevAssociatedDetailViewModel,
    'fd-dev-association': FdDevAssociationModel,
    'fd-dev-attribute': FdDevAttributeModel,
    'fd-dev-base-association': FdDevBaseAssociationModel,
    'fd-dev-class': FdDevClassModel,
    'fd-dev-control-type': FdDevControlTypeModel,
    'fd-dev-diagram-link': FdDevDiagramLinkModel,
    'fd-dev-filelink': FdDevFilelinkModel,
    'fd-dev-form-control': FdDevFormControlModel,
    'fd-dev-form-view': FdDevFormViewModel,
    'fd-dev-inheritance': FdDevInheritanceModel,
    'fd-dev-method': FdDevMethodModel,
    'fd-dev-module-setting-type': FdDevModuleSettingTypeModel,
    'fd-dev-module-setting': FdDevModuleSettingModel,
    'fd-dev-parameter': FdDevParameterModel,
    'fd-dev-process-status': FdDevProcessStatusModel,
    'fd-dev-stage-history': FdDevStageHistoryModel,
    'fd-dev-stage': FdDevStageModel,
    'fd-dev-system': FdDevSystemModel,
    'fd-dev-task': FdDevTaskModel,
    'fd-dev-type-definition': FdDevTypeDefinitionModel,
    'fd-dev-uml-ad': FdDevUmlAdModel,
    'fd-dev-uml-cad': FdDevUmlCadModel,
    'fd-dev-uml-cod': FdDevUmlCodModel,
    'fd-dev-uml-dpd': FdDevUmlDpdModel,
    'fd-dev-uml-sd': FdDevUmlSdModel,
    'fd-dev-uml-std': FdDevUmlStdModel,
    'fd-dev-uml-ucd': FdDevUmlUcdModel,
    'fd-dev-view': FdDevViewModel,
    'fd-diagram-link': FdDiagramLinkModel,
    'fd-diagram': FdDiagramModel,
    'fd-dpd': FdDpdModel,
    'fd-filelink': FdFilelinkModel,
    'fd-following': FdFollowingModel,
    'fd-form-control': FdFormControlModel,
    'fd-form-view': FdFormViewModel,
    'fd-generation-step-log': FdGenerationStepLogModel,
    'fd-generation': FdGenerationModel,
    'fd-inheritance': FdInheritanceModel,
    'fd-object-in-system': FdObjectInSystemModel,
    'fd-plugin-on-rep-object': FdPluginOnRepObjectModel,
    'fd-project': FdProjectModel,
    'fd-registered-plug-in': FdRegisteredPlugInModel,
    'fd-repository-browser-data-object-with-a-c-l': FdRepositoryBrowserDataObjectWithACLModel,
    'fd-repository-browser-data-object': FdRepositoryBrowserDataObjectModel,
    'fd-repository-data-object': FdRepositoryDataObjectModel,
    'fd-repository-object-with-plugins': FdRepositoryObjectWithPluginsModel,
    'fd-repository-ref-data-object': FdRepositoryRefDataObjectModel,
    'fd-repository': FdRepositoryModel,
    'fd-sd': FdSdModel,
    'fd-stage': FdStageModel,
    'fd-std': FdStdModel,
    'fd-storage-type': FdStorageTypeModel,
    'fd-subsystem': FdSubsystemModel,
    'fd-ucd': FdUcdModel,
    'fd-user-auth-profile': FdUserAuthProfileModel,
    'fd-user-in-stage': FdUserInStageModel,
    'fd-view': FdViewModel,
    'fd-visual-control': FdVisualControlModel,
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
          'fd-configuration-list-form': {
            caption: 'Configurations',
            title: ''
          },
          'fd-stage-list-form': {
            caption: 'Stages',
            title: ''
          },
          'fd-system-list-form': {
            caption: 'Systems',
            title: ''
          },
          'fd-diagram-list-form': {
            caption: 'Diagrams',
            title: ''
          },
          'fd-class-list-form': {
            caption: 'Classes',
            title: ''
          },
          'fd-association-list-form': {
            caption: 'Associations',
            title: ''
          },
          'fd-inheritance-list-form': {
            caption: 'Inheritance',
            title: ''
          },
          'fd-view-list-form': {
            caption: 'Views',
            title: ''
          },
          'fd-application-model': {
            caption: 'Модель приложения',
            title: '',
          },
          'fd-diagrams': {
            caption: 'Диаграммы',
            title: '',
          },
          'fd-navigation': {
            caption: 'Навигация',
            title: '',
          },
          'fd-generation': {
            caption: 'Генерация',
            title: '',
          },
          'fd-setting': {
            caption: 'Настройка',
            title: '',
          },
          'fd-architecture': {
            caption: 'Архитектура',
            title: '',
          },
          'fd-all-projects': {
            caption: 'Все проекты',
            title: '',
          },
          'fd-requests': {
            caption: 'Запросы и обращения',
            title: '',
          },
          'fd-docs': {
            caption: 'Документация',
            title: '',
          },
          'fd-chat': {
            caption: 'Чат',
            title: '',
          },
          'fd-current-project-name-header': {
            caption: 'Проект',
            title: '',
          },
          'i-i-s-caseberry-logging-objects-application-log-l': {
            caption: 'Таблица логов',
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
    'fd-appstruct-form': FdAppstructListFormForm,
    'fd-aggregation-list-form': FdAggregationListFormForm,
    'fd-all-projects': FdAllProjects,
    'fd-association-list-form': FdAssociationListFormForm,
    'fd-class-list-form': FdClassListFormForm,
    'fd-configuration-list-form': FdConfigurationListFormForm,
    'fd-diagram-list-form': FdDiagramListFormForm,
    'fd-editform-constructor': FdEditformConstructor,
    'fd-inheritance-list-form': FdInheritanceListFormForm,
    'fd-stage-list-form': FdStageListFormForm,
    'fd-system-list-form': FdSystemListFormForm,
    'fd-view-list-form': FdViewListFormForm,
    'fd-aggregation-edit-form': FdAggregationEditFormForm,
    'new-platform-flexberry-web-designer-generation-l': NewPlatformFlexberryWebDesignerGenerationLForm,
    'new-platform-flexberry-web-designer-storage-type-l': NewPlatformFlexberryWebDesignerStorageTypeLForm,
    'fd-application-edit-form': FdApplicationEditFormForm,
    'fd-association-edit-form': FdAssociationEditFormForm,
    'fd-business-server-edit-form': FdBusinessServerEditFormForm,
    'fd-class-edit-form': FdClassEditFormForm,
    'fd-configuration-edit-form': FdConfigurationEditFormForm,
    'fd-diagram-edit-form': FdDiagramEditFormForm,
    'fd-edit-form-edit-form': FdEditFormEditFormForm,
    'fd-enum-edit-form': FdEnumEditFormForm,
    'fd-external-edit-form': FdExternalEditFormForm,
    'fd-inheritance-edit-form': FdInheritanceEditFormForm,
    'fd-interface-edit-form': FdInterfaceEditFormForm,
    'fd-list-form-edit-form': FdListFormEditFormForm,
    'fd-stage-edit-form': FdStageEditFormForm,
    'fd-system-edit-form': FdSystemEditFormForm,
    'fd-type-edit-form': FdTypeEditFormForm,
    'fd-user-form-edit-form': FdUserFormEditFormForm,
    'fd-view-edit-form': FdViewEditFormForm,
    'fd-visual-edit-form': FdVisualEditFormForm,
    'fd-listform-constructor': FdListformConstructor,
    'fd-generation-process-form': FdGenerationProcessForm,
    'fd-generation': FdGeneration,
    'fd-generation-list-form': FdGenerationListForm,
    'fd-data-types-map': FdDataTypesMapForm,
    'fd-confirm-unsaved-form-modal': FdConfirmUnsavedFormModal,
    'fd-edit-form': FdEditForm,
    'new-platform-flexberry-web-designer-generation-e': NewPlatformFlexberryWebDesignerGenerationEForm,
    'new-platform-flexberry-web-designer-storage-type-e': NewPlatformFlexberryWebDesignerStorageTypeEForm,
    'fd-application-model': FdApplicationModelForm,
    'fd-diagrams': FdDiagramForm,
    'fd-navigation': FdNavigationForm,
    'fd-setting': FdSetting,
  },

  components: {
    'fd-visual-control': FdVisualControlComponent,
    'fd-visual-edit-control-tree': FdVisualEditControlTreeComponent,
    'fd-tabs': FdTabs,
    'fd-attribute-table': FdAttributeTable,
    'fd-implementation-editing-panel': FdClassEditingPanel,
    'fd-userform-editing-panel': FdUserformEditingPanel,
    'fd-type-editing-panel': FdTypeEditingPanel,
    'fd-external-editing-panel': FdExternalEditingPanel,
    'fd-custom-editing-panel': FdCustomEditingPanel,
    'fd-application-editing-panel': FdApplicationEditingPanel,
    'fd-interface-editing-panel': FdInterfaceEditingPanel,
    'fd-businessserver-editing-panel': FdBsEditingPanel,
    'fd-enumeration-editing-panel': FdEnumEditingPanel,
    'fd-editform-editing-panel': FdEditFormEditingPanel,
    'fd-listform-editing-panel': FdListFormEditingPanel,
    'fd-geolayer-editing-panel': FdGeolayerFormEditingPanel,
    'fd-geolayerstyle-editing-panel': FdGeolayerstyleFormEditingPanel,
    'fd-create-view': FdCreateView,
    'fd-sheets-tool-bar': FdSheetToolBar,
    'fd-create-node-editing-panel': FdCreateNodeEditingPanel,
    'fd-folder-editing-panel': FdFolderEditingPanel,
    'fd-property-editing-panel': FdPropertyEditingPanel,
    'fd-create-entity': FdCreateEntity,
    'fd-create-diagrams': FdCreateDiagrams,
    'fd-view-definition-item': FdViewDefinitionItem,
    'fd-modal-message-box': FdfModalMessageBox,
  }

});

export default translations;
