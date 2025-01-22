// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Weather App',
        },
    },
    ssr: false,
    devtools: { enabled: true },
    pages: true,
    modules: ['@nuxt/ui'],
    runtimeConfig: {
        public: {
          baseWeb: process.env.BASE_WEB
        }
    }
});
