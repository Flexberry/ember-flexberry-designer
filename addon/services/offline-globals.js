import OfflineGlobals from 'ember-flexberry/services/offline-globals';
import { merge } from '@ember/polyfills';

export default OfflineGlobals.reopen({
  init() {
    this._super(...arguments);

  },
  getOfflineSchema() {
    let parentSchema = this._super(...arguments);
    let returnedSchema = merge(parentSchema, {
      /*'fd-ad': 'id,helpKeyword,name,primitives,primitiveTypes',
			'fd-aggregation': 'id',
			'fd-application-user': 'id,administrator,emailApproved,agent,*userAuthProfiles',
			'fd-association': 'id',
			'fd-auth-type': 'id,name',
			'fd-base-association': 'id,endMultiplicity,endRole,endRoleAccessModifier,endRoleStored,endRoleStr,notNullStart,startMultiplicity,startRole,startRoleAccessModifier,startRoleStored,startRoleStr,endClass,startClass,stage',
			'fd-cad': 'id,helpKeyword,name,primitives,primitiveTypes',
			'fd-case-property': 'id,name,value',
			'fd-class-storage-type': 'id,connectionName,connectionString,storageType,class',
			'fd-class': 'id,nameStr,attributesStr,methodsStr,stored,stereotype,stage',
			'fd-cod': 'id,helpKeyword,name,primitives,primitiveTypes',
			'fd-configuration': 'id,project,*stages',
			'fd-dev-aggregation': 'id,assocType,autoGenerateDetailTypeUsage,autoGenerateTypeUsage,detailTypeUsage,pBAggregatorCustomAttributes,pBAggregatorGetEnd,pBAggregatorGetStart,pBAggregatorSetEnd,pBAggregatorSetStart,pBDetailCustomAttributes,pBDetailGetEnd,pBDetailGetStart,pBDetailSetEnd,pBDetailSetStart,pBMasterCustomAttributes,pBMasterGetEnd,pBMasterGetStart,pBMasterSetEnd,pBMasterSetStart,realStorage,typeUsage',
			'fd-dev-associated-detail-view': 'id,detailLoadOnLoadAgregator,detailName,detailViewName,view',
			'fd-dev-association': 'id,assocType,autoGenerateTypeUsage,pBMasterCustomAttributes,pBMasterGetEnd,pBMasterSetEnd,pBMasterGetStart,pBMasterSetStart,realStorage,typeUsage',
			'fd-dev-attribute': 'id,accessModifier,autoincrement,caption,dataServiceExpression,dataServiceExpressionXML,defaultValue,hint,notNull,order,orderNum,pBCustomAttributes,pBGetEnd,pBSetEnd,pBGetStart,pBSetStart,realCaption,realStorage,storage,publishName,stored,trim,type,class',
			'fd-dev-base-association': 'id,assocType,autoStoreMasterDisabled,realEndRole,realStartRole,storage,startRolePublishName,endRolePublishName',
			'fd-dev-class': 'id,accessType,addAuditFields,appConfig,appConfigFile,auditConnectionStringName,auditEnabled,auditWinServiceUrl,autoAltered,bSClass,bSEvents,businessServerEvents,caption,comPlusServerOptions,comPlusServerPropertiesStr,containers,containersStr,dataObjectTypes,dataObjectTypesStr,deleteAudit,deleteAuditViewName,disableAllRightChecks,editFormOperations,editFormOperationsStr,expandOperations,fixDependedForm,formUrl,generateCatcher,generateComPlusServer,generateDependedForm,generateHttpRemoteServer,hierarchicalMaster,insertAudit,insertAuditViewName,listFormOperations,listFormOperationsStr,loadingOrder,loadingOrderXML,namespacePostfix,onlyShowSelectedValue,packet,pBCustomAttributes,pBGetViewsForForm,pBMembers,primaryKeyStorage,printContainer,propertyLookup,propertyLookupStr,publishToEBSD,realCaption,realNamespace,realPacket,realPrimaryKeyStorage,realStorage,scriptName,selectAudit,selectAuditViewName,standartDesktop,storage,publishName,storeInstancesInType,storeInstancesInTypeXML,trim,updateAudit,updateAuditViewName,useCache,useDefaultView,writeMode,writeSessions,businessServerClass,*classStorageTypes,*views,*methods,*formViews,*attributes',
			'fd-dev-control-type': 'id,designerHtmlTemplate,designerMetadataXml,name,editedType,stage',
			'fd-dev-diagram-link': 'id',
			'fd-dev-filelink': 'id',
			'fd-dev-form-control': 'id,name,order,propertyPath,settingsXml,controlType,propertyType,formView',
			'fd-dev-form-view': 'id,dataObjectTypes,dataObjectTypesStr,hierarchicalMaster,listFormOperations,listFormOperationsStr,orderNum,propertyLookup,propertyLookupStr,viewForForm,view,class,*controls',
			'fd-dev-inheritance': 'id',
			'fd-dev-method': 'id,accessModifier,accessType,caption,isEvent,orderNum,parametersStr,pBCustomAttributes,publishToUser,realCaption,type,typeParametersStr,class,*parameters',
			'fd-dev-module-setting-type': 'id,name',
			'fd-dev-module-setting': 'id,valueXML,moduleSettingTypeName,moduleSettingType,stage',
			'fd-dev-parameter': 'id,caption,modifier,orderNum,realCaption,type,method',
			'fd-dev-process-status': 'id,message,error,completionPercent',
			'fd-dev-stage-history': 'id,user,date,stageName,stage',
			'fd-dev-stage': 'id,additionalPluginsSettings,additionalPluginsSettingsStr,auditEnabled,chosenPalette,company,connectionString,copyright,dataObjectNameSpace,defaultAccessType,defaultBaseClass,defaultDetailArrayClass,defaultEditScriptName,defaultListScriptName,defaultTypeMapTypes,defaultWriteMode,doNotDeleteExtraTables,enableAuElement,indexComment,isAuditDatabaseLocal,isReportDatabaseLocal,lastIndexDate,operationsEnumNamespace,operationsEnumPacket,oracleConnectionString,postgreConnectionString,product,realDataObjectNameSpace,scriptNamespace,scriptPacket,serializedIndex,signAssemblies,sourceAzStoragePath,sourceCodeCSPath,sourceCodeVBPath,sourceControlUri,sQLPath,typeMapAccess,typeMapAccessStr,typeMapCS,typeMapCSStr,typeMapOracle,typeMapOracleStr,typeMapPostgre,typeMapPostgreStr,typeMapSQL,typeMapSQLStr,typeMapVB,typeMapVBStr,useSourceControl,version,*typeDefinitions,*controlTypes,*users,*moduleSettings,*generations',
			'fd-dev-system': 'id',
			'fd-dev-task': 'id,methodName,settingsStr,stagePrimaryKeyStr,typeName',
			'fd-dev-type-definition': 'id,caption,formatAttribute,mapTypeAssemblyName,mapTypeName,name,stage',
			'fd-dev-uml-ad': 'id,name,primitiveTypes,primitives,helpKeyword',
			'fd-dev-uml-cad': 'id,name,primitiveTypes,primitives,helpKeyword',
			'fd-dev-uml-cod': 'id,name,primitiveTypes,primitives,helpKeyword',
			'fd-dev-uml-dpd': 'id,name,primitiveTypes,primitives,helpKeyword',
			'fd-dev-uml-sd': 'id,name,primitiveTypes,primitives,helpKeyword',
			'fd-dev-uml-std': 'id,name,primitiveTypes,primitives,helpKeyword',
			'fd-dev-uml-ucd': 'id,name,primitiveTypes,primitives,helpKeyword',
			'fd-dev-view': 'id,definition,properties,class',
			'fd-diagram-link': 'id,diagramPrimaryKey,diagramType,subsystem',
			'fd-diagram': 'id,caseObjectsString,primitivesJsonString,elements,subsystem',
			'fd-dpd': 'id,helpKeyword,name,primitives,primitiveTypes',
			'fd-filelink': 'id,fileName,subsystem',
			'fd-following': 'id,follow,follower',
			'fd-form-control': 'id,name,order,propertyPath,settingsXml,formView',
			'fd-form-view': 'id,name,description,ordernum,dataObjectTypesStr,propertyLookupStr,listFormOperationsStr,hierarchicalMaster,view,*formControl',
			'fd-generation-step-log': 'id,time,text,thisIsError,isWarn,generation',
			'fd-generation': 'id,startTime,endTime,state,generationReason,userName,isRunning,percentComplete,stage,*stepLogs',
			'fd-inheritance': 'id,child,parent,stage',
			'fd-object-in-system': 'id',
			'fd-plugin-on-rep-object': 'id,settings,plugin,plugOutObject',
			'fd-project': 'id,repository,*configurations',
			'fd-registered-plug-in': 'id,pluginObject,name,storedType,type',
			'fd-repository-browser-data-object-with-a-c-l': 'id,aCL',
			'fd-repository-browser-data-object': 'id,createUser,createDate,changeUser,changeDate',
			'fd-repository-data-object': 'id,name,description,nameStr',
			'fd-repository-object-with-plugins': 'id,*plugins',
			'fd-repository-ref-data-object': 'id,referenceCount',
			'fd-repository': 'id,*projects',
			'fd-sd': 'id,helpKeyword,name,primitives,primitiveTypes',
			'fd-stage': 'id,chosenPalette,configuration,*systems,*inheritances,*associations,*classes',
			'fd-std': 'id,helpKeyword,name,primitives,primitiveTypes',
			'fd-storage-type': 'id,shortName,dataServiceFullTypeName,actual,stage',
			'fd-subsystem': 'id,stage,*diagrams,*diagramLinks,*filelinks',
			'fd-ucd': 'id,helpKeyword,name,primitives,primitiveTypes',
			'fd-user-auth-profile': 'id,authId,name,approved,authType,applicationUser,*following',
			'fd-user-in-stage': 'id,access,applicationUser,stage',
			'fd-view': 'id,name,description,definition',
			'i-c-s-soft-s-t-o-r-m-n-e-t-security-agent': 'id,name,login,pwd,isUser,isGroup,isRole,connString,enabled,email,domain,agentKey,full,read,insert,update,delete,execute,createTime,creator,editTime,editor'*/
    });

    return returnedSchema;
  }
});
