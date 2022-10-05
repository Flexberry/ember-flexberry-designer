import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(definition) {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(definition, 'text/xml');
    if (xmlDoc) {
      let additionalPluginsSettings = xmlDoc.getElementsByTagName('AdditionalPluginsSettings');
      if (additionalPluginsSettings.length !== 0) {
        let additionalPluginsSetting = additionalPluginsSettings[0];
        let doNotDeleteExtraTables = additionalPluginsSetting.getElementsByTagName('DoNotDeleteExtraTables');
        if (doNotDeleteExtraTables.length !== 0) {
          let doNotDeleteExtraTable = doNotDeleteExtraTables[0];
          let dndETs = doNotDeleteExtraTable.getElementsByTagName('dndET');
          if (dndETs.length !== 0) {
            let dndET = dndETs[0];
            let dndExtTables = dndET.getAttribute('dndExtTables') === 'True' ? true : false;

            return dndExtTables;
          }
        }
      }
    }

    return false;
  },

  serialize(deserialized) {
    if (!deserialized) {
      return deserialized;
    }

    let dndExtTables = `dndExtTables="${deserialized === true ? 'True' : 'False'}"`;
    let dndET = `<dndET ${dndExtTables} />`;

    return `<AdditionalPluginsSettings><DoNotDeleteExtraTables>${dndET}</DoNotDeleteExtraTables></AdditionalPluginsSettings>`;
  }
});
