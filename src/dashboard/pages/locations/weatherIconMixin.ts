const glob = import.meta.glob('@/assets/icons/*.svg');

export default {
    async created() {
        this.icons = Object.fromEntries(
          await Promise.all(
            Object.entries(glob).map(async ([key, value]) => [
              key.split('/').pop().split('.')[0], // Extract the icon number from the file name
              (await value()).default // Get the URL of the icon file
            ])
          )
        );
    },
    methods: {
      getIconUrl(code: number) {
        const iconName = this.getWeatherIcon(code);
        return glob`@/assets/icons/${iconName}.svg`.then(module => module.default);
      },
      getWeatherIcon(code: number) {
        switch (true) {
          case code === 0:
            return '1';
          case code >= 1 && code <= 3:
          case code >= 80 && code <= 82:
            return '2';
          case code >= 45 && code <= 48:
          case code >= 51 && code <= 57:
          case code >= 61 && code <= 67:
            return '3';
          case code >= 71 && code <= 75:
          case code >= 85 && code <= 86:
            return '4';
          case code >= 95 && code <= 99:
            return '5';
          default:
            return '1';
        }
      },
    }
  }
  