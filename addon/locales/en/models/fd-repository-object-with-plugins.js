export default {
  projections: {
    Edit: {
      name: {
        __caption__: 'name'
      },
      description: {
        __caption__: 'description'
      },
      aCL: {
        __caption__: 'aCL'
      },
      plugins: {
        __caption__: 'plugins',
        plugin: {
          __caption__: 'plugin',
          storedType: {
            __caption__: 'storedType'
          }
        },
        settings: {
          __caption__: 'settings'
        }
      }
    },
    PluginsOnly: {
      plugins: {
        __caption__: 'plugins',
        plugin: {
          __caption__: 'plugin',
          storedType: {
            __caption__: 'storedType'
          }
        },
        settings: {
          __caption__: 'settings'
        }
      }
    }
  }
};
