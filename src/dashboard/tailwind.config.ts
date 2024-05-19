import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
    theme: {
        extend: {
          colors: {
            'custom-cyan': '#d4e8f8',
            'custom-gray': '#323232',
            'custom-gray-dashboard': '#1b1b1d',
            'custom-gray-text': '#bebebe',
            'custom-gray-input': '#555555',
          }
        }
      },
};
