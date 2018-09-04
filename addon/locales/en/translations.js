import Ember from 'ember';
import EmberFlexberryTranslations from 'ember-flexberry/locales/en/translations';
import FdAppstructListFormForm from './forms/fd-appstruct-form';
import FdAggregationListFormForm from './forms/fd-aggregation-list-form';
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
import FdAssociationEditFormForm from './forms/fd-association-edit-form';
import FdClassEditFormForm from './forms/fd-class-edit-form';
import FdConfigurationEditFormForm from './forms/fd-configuration-edit-form';
import FdApplicationEditFormForm from './forms/fd-application-edit-form';
import FdBusinessServerEditFormForm from './forms/fd-business-server-edit-form';
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
import FdVisualEditFormForm from './forms/fd-visual-edit-form-form';
import FdListformConstructor from './forms/fd-listform-constructor';
import FdGenerationProcessForm from './forms/fd-generation-process-form';
import FdGenerationListForm from './forms/fd-generation-list-form';
import FdDataTypesMapForm from './forms/fd-data-types-map';
import FdConfirmUnsavedFormModal from './forms/fd-confirm-unsaved-form-modal';
import FdAdModel from './models/fd-ad';
import FdAggregationModel from './models/fd-aggregation';
import FdAssociationModel from './models/fd-association';
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
import FdFormControlModel from './models/fd-form-control';
import FdFormViewModel from './models/fd-form-view';
import FdGenerationModel from './models/fd-generation';
import FdGenerationStepLogModel from './models/fd-generation-step-log';
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
import FdViewModel from './models/fd-view';
import FdVisualControlModel from './models/fd-visual-control';
import FdVisualControlComponent from './components/fd-visual-control';
import FdVisualEditControlTreeComponent from './components/fd-visual-edit-control-tree';
import FdTabs from './components/fd-tabs';

const translations = {};
Ember.$.extend(true, translations, EmberFlexberryTranslations);

Ember.$.extend(true, translations, {
  models: {
    'fd-ad': FdAdModel,
    'fd-aggregation': FdAggregationModel,
    'fd-association': FdAssociationModel,
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
    'fd-form-control': FdFormControlModel,
    'fd-form-view': FdFormViewModel,
    'fd-generation': FdGenerationModel,
    'fd-generation-step-log': FdGenerationStepLogModel,
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
    'fd-view': FdViewModel,
    'fd-visual-control': FdVisualControlModel,
  },

  forms: {
    'fd-appstruct-form': FdAppstructListFormForm,
    'fd-aggregation-list-form': FdAggregationListFormForm,
    'fd-association-list-form': FdAssociationListFormForm,
    'fd-class-list-form': FdClassListFormForm,
    'fd-configuration-list-form': FdConfigurationListFormForm,
    'fd-diagram-list-form': FdDiagramListFormForm,
    'fd-editform-constructor': FdEditformConstructor,
    'fd-inheritance-list-form': FdInheritanceListFormForm,
    'fd-stage-list-form': FdStageListFormForm,
    'fd-system-list-form': FdSystemListFormForm,
    'fd-view-list-form': FdViewListFormForm,
    'fd-application-edit-form': FdApplicationEditFormForm,
    'fd-aggregation-edit-form': FdAggregationEditFormForm,
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
    'fd-generation-list-form': FdGenerationListForm,
    'fd-data-types-map': FdDataTypesMapForm,
    'fd-confirm-unsaved-form-modal': FdConfirmUnsavedFormModal
  },

  components: {
    'fd-visual-control': FdVisualControlComponent,
    'fd-visual-edit-control-tree': FdVisualEditControlTreeComponent,
    'fd-tabs': FdTabs
  }

});

export default translations;
